### `yarn`
install node module
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

environment:
REACT_APP_PEMULIHAN_EKONOMI_URL=https://devadaumkm.kotabogor.go.id/ms-core/
REACT_APP_ENC_SECRET="base64:WQ/QR8i62r8vYGArsbEVQdpnRoxQ1DcX+33N5xh4BzA="
REACT_APP_RECAPTCHA_SITE_KEY="6LeYVMwZAAAAAIOqF-Z1JH7MVXWfWTJ01MRB9Sjw"
REACT_APP_UPLOAD_FILE=https://devadaumkm.kotabogor.go.id/ms-upload-file/
REACT_APP_MESSAGING_URL=https://devadaumkm.kotabogor.go.id/ms-messaging/
REACT_APP_ADMIN_URL=https://devadaumkm.kotabogor.go.id/admin/

routes:
"/chat"
"/profile/:id"
"/dashboard/reset-password"
"/dashboard/product"
"/dashboard/profile"
"/dashboard"
"/faq"
"/info-wisata/:id"
"/info-wisata"
"/umkm"
"/umkm/:id"
"/search"
"/product/:id"
"/register"
"/login"
"/"

routes admin:
"/admin-login"
"/dashboard-admin/admin"
"/dashboard-admin/user"
"/dashboard-admin/category"
"/dashboard-admin/product"
"/dashboard-admin/banner"
"/dashboard-admin/info-wisata"
"/dashboard-admin/faq/list"
"/dashboard-admin/faq/category"
"/dashboard-admin"