import md5 from "crypto-js/md5";
import toast from "react-hot-toast";
export default class User {
  private _email: string;
  private _pass: string;

  constructor(public vEmail: string, public vPass: string) {
    this._email = vEmail;
    this._pass = vPass;
  }

  get email() {
    return this._email;
  }

  get pass() {
    return this._pass;
  }

  set email(vEmail: string) {
    this._email = vEmail;
  }

  set pass(vPass: string) {
    this._pass = md5(import.meta.env.VITE_SK + vPass).toString();
  }

  async comprobUser() {
    try {
      const compU = await fetch(`${import.meta.env.VITE_H}/users/compUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          pass: this.pass,
        }),
      });
      console.log(compU);
      toast.success("Sesión iniciada");
    } catch (error) {
      switch (error) {
        case "IEP":
          toast.error("Email o contraseña incorrectos");
          break;
        default:
          toast.error("Error al iniciar sesión");
          break;
      }
    }
  }
}
