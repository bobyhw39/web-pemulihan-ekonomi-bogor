import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import { ProtectedRoute } from "./protectedRoute";

import SockJS from "sockjs-client";
import { EncryptionUtil } from "../utils/Encryption";
import { ChatMessage } from "../models/ChatOnly";
import { changeStateChatRequest } from "../actions/chat";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../models/RootState";
import IndexPage from "../components/Page/IndexPage";

const Routes = () => {
  const dispatch = useDispatch();
  let stompClients: any = null;
  const { dataMessage, selectedUserID } = useSelector(
    (state: RootState) => state.chat
  );
  let onConnected = () => {
    const user: any = ProtectedRoute()?.data?.user_id;
    console.log("Connected!!");
    let messageAdd: ChatMessage[] = dataMessage;
    stompClients.subscribe(
      "/topic/message/" +
        EncryptionUtil.encodeHex(user + "-message-destination"),
      function (msg: any) {
        if (msg.body) {
          let messageAdd2: ChatMessage[] = messageAdd;
          let jsonMessage: ChatMessage = JSON.parse(msg.body);
          messageAdd2.push(jsonMessage);
          dispatch(changeStateChatRequest("selectedUserID", selectedUserID));
          dispatch(changeStateChatRequest("inputMessage", messageAdd2));
        }
      }
    );
  };
  let onDisconnected = () => {
    console.log("Disconnected!!");
  };
  let connectWs = () => {
    const sockJsClient = new SockJS(
      `${process.env.REACT_APP_MESSAGING_URL}ws/`
    );
    const tokenFromStore = localStorage.getItem("access_token");
    var Stomp = require("stompjs/lib/stomp.js").Stomp;
    stompClients = Stomp.over(sockJsClient);
    stompClients.connect(
      { Authorization: tokenFromStore },
      onConnected,
      onDisconnected
    );
    // stompClients.connect({},onConnected,onDisconnected)
  };

  useEffect(() => {
    var currentLocation = window.location.pathname;
    if (ProtectedRoute().wsChat) {
      if (!currentLocation.includes("admin")) {
        connectWs();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IndexPage
      title="ADA UMKM"
      authedData={ProtectedRoute().data || undefined}
      routes={ProtectedRoute().routes}
    >
      <Suspense fallback={<div />}>
        <Switch>
          {ProtectedRoute().routes.map((value: any, key: any) => (
            <Route
              key={key}
              exact={value.exact}
              path={value.path}
              render={() => (
                <value.component authedData={ProtectedRoute().data} />
              )}
            />
          ))}
          <Route path="*" 
          render={() => (
            <PageNotFound authedData={ProtectedRoute().data || undefined} authedDataAdmin={ProtectedRoute().dataAdmin || undefined} />
          )} />
        </Switch>
      </Suspense>
    </IndexPage>
  );
};
const RootRoutes = () => <Route component={Routes} />;

export default RootRoutes;
