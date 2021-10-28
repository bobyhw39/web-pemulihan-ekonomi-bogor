import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination, AutoPlay, Fade } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import "./reactFlicking.css";

/**
 * Create banner with master key.
 * @param {Object} data to be list banner
 * @return {Component} Banner Components
 */

type Props = {
  data:any
};

const Banner: React.FC<Props> = ({data}) => {

  const _plugins = [
    new Fade(),
    new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: true }),
    new Pagination({ type: "bullet" }),
  ];
 
  return (
    <>
      <Flicking
        circular={true}
        plugins={_plugins}
        // resizeOnContentsReady={true}
        adaptive={true}
      >
        {data()?.map((v: any, k: any) => (
          <>
            <div
              key={k}
              className="flicking-panel has-background-white has-text-dark is-size-1 card card-panel"
            >
              <img className="panel-image" alt="" src={v} />
            </div>
          </>
        ))}

        <ViewportSlot>
          <div className="flicking-pagination "></div>
        </ViewportSlot>
      </Flicking>
    </>
  );
};

export default Banner;
