import md5 from "crypto-js/md5";
import toast from "react-hot-toast";

export default class User {
  private _email: string;
  private _password: string;
  private _id: string;

  constructor(public vEmail: string, public vPass: string) {
    this._id = "";
    this._email = vEmail;
    this._password = vPass;
  }

  get email() {
    return this._email;
  }

  get id() {
    return this._id;
  }

  get password() {
    return this._password;
  }

  set email(vEmail: string) {
    this._email = vEmail;
  }

  set pass(vPass: string) {
    this._password = md5(import.meta.env.VITE_SK + vPass).toString();
  }

  set id(vId: string) {
    this._id = vId;
  }

  async comprobUser(): Promise<"IEP" | string | "ERR"> {
    const loadComp = toast.loading("Iniciando sesión...");
    try {
      const compU = await fetch(`${import.meta.env.VITE_H}/users/compUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          pass: this.password,
        }),
      });
      const response = await compU.json();
      console.log(response);
      if (response.res == "IEP") {
        toast.error("Email o contraseña incorrectos");
        return "IEP";
      } else {
        toast.success("Sesión iniciada");
        return response.res;
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      return "ERR";
    } finally {
      toast.dismiss(loadComp);
    }
  }

  static async getInfo(userId: string): Promise<boolean | JSON> {
    const loadComp = toast.loading("Cargando...");
    try {
      const compU = await fetch(`${import.meta.env.VITE_H}/users/getInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
      const response = await compU.json();
      toast.dismiss(loadComp);
      console.log(response);
      return response;
    } catch (error) {
      toast.dismiss(loadComp);
      toast.error("Error al iniciar sesión");
      return false;
    }
  }
}
