import md5 from "crypto-js/md5";
import toast from "react-hot-toast";

export default class User {
  private _email: string;
  private _password: string;
  private _id: string;
  private _name: string;
  private _fname: string;
  private _birthday: Date;
  private _avatar: string;
  private _genre: string;
  private _profile: string;
  private _diverdays: Array<number>;

  constructor(
    public vEmail: string,
    public vPass: string,
    public vId?: string
  ) {
    this._id = vId ? vId : "";
    this._email = vEmail;
    this._password = vPass;
    this._name = "";
    this._fname = "";
    this._birthday = new Date();
    this._avatar = "";
    this._genre = "";
    this._profile = "";
    this._diverdays = [];
  }

  get name(): string {
    return this._name;
  }

  get diverdays(): number[] {
    return this._diverdays;
  }

  get fname(): string {
    return this._fname;
  }

  get birthday(): Date {
    return this._birthday;
  }

  get avatar(): string {
    return this._avatar;
  }

  get genre(): string {
    return this._genre;
  }

  get profile(): string {
    return this._profile;
  }

  get email(): string {
    return this._email;
  }

  get id(): string {
    return this._id;
  }

  get password(): string {
    return this._password;
  }

  set name(vName: string) {
    this._name = vName;
  }

  set fname(vFname: string) {
    this._fname = vFname;
  }

  set diverdays(vDiverdays: Array<number>) {
    this._diverdays = vDiverdays;
  }

  set birthday(vBirthday: Date) {
    this._birthday = vBirthday;
  }

  set avatar(vAvatar: string) {
    this._avatar = vAvatar;
  }

  set genre(vGenre: string) {
    this._genre = vGenre;
  }

  set profile(vProfile: string) {
    this._profile = vProfile;
  }
  set email(vEmail: string) {
    this._email = vEmail;
  }

  set password(vPass: string) {
    this._password = md5(import.meta.env.VITE_SK + vPass).toString();
  }

  set id(vId: string) {
    this._id = vId;
  }

  private addDiverDay(diverday: number) {
    this.diverdays.push(diverday);
  }

  public async actDiverDay(diverday: number): Promise<boolean> {
    const loadComp = toast.loading("Añadiendo diversario...");
    try {
      const updateU = await fetch(
        `${import.meta.env.VITE_H}/users/addDiverDay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: this.id,
            diverday: diverday,
          }),
        }
      );
      const response = await updateU.json();
      if (response.res == "OK") {
        toast.dismiss(loadComp);
        toast.success("Diversario añadido!");
        this.addDiverDay(diverday);
        return true;
      } else if (response.res == "EXISTS") {
        toast.dismiss(loadComp);
        toast.error("Ya existe este diversario");
        return false;
      } else {
        toast.dismiss(loadComp);
        toast.error("Error al añadir el diversario");
        return false;
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadComp);
      toast.error("Error al anadir el diversario");
      return false;
    }
  }

  public async updateU(): Promise<void> {
    const loadComp = toast.loading("Actualizando...");
    try {
      const updateUser = await fetch(`${import.meta.env.VITE_H}/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          name: this.name,
          fname: this.fname,
          birthday: this.birthday,
          avatar: this.avatar,
          genre: this.genre,
          profile: this.profile,
        }),
      });
      const response = await updateUser.json();
      console.log(response);
      if (response.res == "OK") {
        toast.dismiss(loadComp);
        toast.success("Usuario actualizado");
      } else {
        toast.dismiss(loadComp);
        toast.error("Error al actualizar usuario");
      }
    } catch {
      toast.dismiss(loadComp);
      toast.error("Error al conectar a la base de datos");
    }
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

  static async getInfo(userId: string): Promise<boolean | User> {
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
      try {
        const response = await compU.json();
        toast.dismiss(loadComp);
        console.log(response);
        return Object.setPrototypeOf(response, User.prototype) as User;
      } catch (error) {
        console.log(error);
        toast.dismiss(loadComp);
        toast.error("Error al convertir JSON");
        return false;
      }
    } catch (error) {
      toast.dismiss(loadComp);
      toast.error("Error al iniciar sesión");
      return false;
    }
  }
}
