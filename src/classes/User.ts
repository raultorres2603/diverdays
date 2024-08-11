import md5 from "crypto-js/md5";
import toast from "react-hot-toast";

export type DiverDay = {
  diverDay: number;
  diverPhotos: Array<string>;
};

export default class User {
  private _email: string;
  private _password: string;
  private _id: string;
  private _name: string;
  private _fname: string;
  private _birthday: Date;
  private _avatar: string;
  private _accepted: boolean;
  private _genre: string;
  private _alias: string;
  private _profile: string;
  private _diverdays: Array<DiverDay>;
  private _friends: Array<User>;
  private _friendss: Array<User>;
  private _token: string | undefined;

  /**
   * Initializes a new instance of the User class.
   *
   * @param {string} vEmail - The email address of the user.
   * @param {string} vPass - The password of the user.
   * @param {string} [vId] - The optional ID of the user.
   */
  constructor(
    public vEmail: string,
    public vPass: string,
    public vId?: string
  ) {
    this._id = vId ? vId : "";
    this._email = vEmail;
    this._password = vPass;
    this._name = "";
    this._alias = "";
    this._fname = "";
    this._birthday = new Date();
    this._avatar = "";
    this._accepted = false;
    this._genre = "";
    this._profile = "";
    this._diverdays = [];
    this._friends = [];
    this._friendss = [];
    this._token = "";
  }

  /**
   * Returns the name of the user.
   *
   * @return {string} The name of the user.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Returns an array of User objects representing the friends of the user.
   *
   * @return {User[]} An array of User objects representing the friends of the user.
   */
  public get friendss(): User[] {
    return this._friendss;
  }

  /**
   * Returns an array of DiverDay objects representing the diverdays of the user.
   *
   * @return {DiverDay[]} An array of DiverDay objects representing the diverdays of the user.
   */
  public get diverdays(): DiverDay[] {
    return this._diverdays;
  }

  /**
   * Returns the acceptance status of the user.
   *
   * @return {boolean} The acceptance status of the user.
   */
  public get accepted(): boolean {
    return this._accepted;
  }

  /**
   * Returns the alias of the user.
   *
   * @return {string} The alias of the user.
   */
  public get alias(): string {
    return this._alias;
  }

  /**
   * Returns the first name of the user.
   *
   * @return {string} The first name of the user.
   */
  public get fname(): string {
    return this._fname;
  }

  /**
   * Returns the token of the user.
   *
   * @return {string} The token of the user.
   */
  public get token(): string | undefined {
    return this._token;
  }

  /**
   * Returns the birthday of the user as a Date object.
   *
   * @return {Date} The birthday of the user.
   */
  public get birthday(): Date {
    return this._birthday;
  }

  /**
   * Returns the avatar URL of the user.
   *
   * @return {string} The URL of the user's avatar.
   */
  public get avatar(): string {
    return this._avatar;
  }

  /**
   * Returns the genre of the user.
   *
   * @return {string} The genre of the user.
   */
  public get genre(): string {
    return this._genre;
  }

  /**
   * Returns the profile of the user.
   *
   * @return {string} The profile of the user.
   */
  public get profile(): string {
    return this._profile;
  }

  /**
   * Returns the email address of the user.
   *
   * @return {string} The email address of the user.
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Returns the id of the object.
   *
   * @return {string} The id of the object.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Returns the password of the user.
   *
   * @return {string} The password of the user.
   */
  public get password(): string {
    return this._password;
  }

  /**
   * Returns the array of friends of the user.
   *
   * @return {Array<User>} The array of friends of the user.
   */
  public get friends(): Array<User> {
    return this._friends;
  }

  /**
   * Sets the value of the name property.
   *
   * @param {string} vName - The new value for the name property.
   */
  set name(vName: string) {
    this._name = vName;
  }

  /**
   * Sets the value of the fname property.
   *
   * @param {string} vFname - The new value for the fname property.
   */
  set fname(vFname: string) {
    this._fname = vFname;
  }

  /**
   * Sets the value of the accepted property.
   *
   * @param {boolean} vAccepted - The new value for the accepted property.
   */
  set accepted(vAccepted: boolean) {
    this._accepted = vAccepted;
  }

  /**
   * Sets the value of the alias property.
   *
   * @param {string} vAlias - The new value for the alias property.
   */
  set alias(vAlias: string) {
    this._alias = vAlias;
  }

  /**
   * Sets the value of the friendss property.
   *
   * @param {Array<User>} vFriendss - The new value for the friendss property.
   */
  set friendss(vFriendss: Array<User>) {
    this._friendss = vFriendss;
  }

  /**
   * Sets the value of the diverdays property.
   *
   * @param {Array<DiverDay>} vDiverdays - The new value for the diverdays property.
   */
  set diverdays(vDiverdays: Array<DiverDay>) {
    this._diverdays = vDiverdays;
  }

  /**
   * Sets the value of the token property.
   *
   * @param {string} vToken - The new value for the token property.
   */
  set token(vToken: string) {
    /**
     * Sets the value of the token property. The token is used to authenticate
     * the user in the API.
     *
     * @param {string} vToken - The new value for the token property.
     */
    this._token = vToken;
  }

  /**
   * Sets the value of the birthday property.
   *
   * @param {Date} vBirthday - The new value for the birthday property.
   */
  set birthday(vBirthday: Date) {
    this._birthday = vBirthday;
  }

  /**
   * Sets the value of the avatar property.
   *
   * @param {string} vAvatar - The new value for the avatar property.
   */
  set avatar(vAvatar: string) {
    this._avatar = vAvatar;
  }

  /**
   * Sets the value of the genre property.
   *
   * @param {string} vGenre - The new value for the genre property.
   */
  set genre(vGenre: string) {
    this._genre = vGenre;
  }

  /**
   * Sets the value of the profile property.
   *
   * @param {string} vProfile - The new value for the profile property.
   */
  set profile(vProfile: string) {
    this._profile = vProfile;
  }
  set email(vEmail: string) {
    this._email = vEmail;
  }

  set password(vPass: string) {
    console.log(import.meta.env.VITE_SK);
    this._password = md5(import.meta.env.VITE_SK + vPass).toString();
  }

  private set id(vId: string) {
    this._id = vId;
  }

  set friends(vFriends: Array<User>) {
    this._friends = vFriends;
  }

  /**
   * Adds a new DiverDay to the list of diverdays.
   *
   * @param {DiverDay} diverday - The DiverDay object to be added.
   * @return {void} This function does not return anything.
   */
  private addDiverDay(diverday: DiverDay): void {
    if (!this.diverdays) {
      this.diverdays = [];
    }
    this.diverdays.push(diverday);
  }

  /**
   * Adds a new friend to the list of friends.
   *
   * @param {User} friend - The User object representing the friend to be added.
   * @return {void} This function does not return anything.
   */
  public async addFriend(friend: User): Promise<boolean> {
    if (!this.friends) {
      this.friends = [];
    }
    this.friends.push(friend);
    try {
      const req = await fetch(`${import.meta.env.VITE_H}/users/addFriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: this.token,
          friend: friend,
        }),
      });
      const resp = await req.json();
      if ((resp.res as string) == "OK") {
        toast.success("Amistad agregado");
        return true;
      } else if ((resp.res as string) == "EXISTS") {
        toast.error("Ya tienes de amistad a esta persona");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * Asynchronously updates a diver day for a user and adds photos to it.
   *
   * @param {DiverDay} diverday - The diver day to be updated.
   * @param {string[]} diverPhotos - The photos to be added to the diver day.
   * @return {Promise<void>} A promise that resolves when the update is complete.
   */
  public async celebDiverDay(
    diverday: DiverDay,
    diverPhotos: string[]
  ): Promise<void> {
    // Show loading toast
    const loadComp = toast.loading("Actualizando diversario...");

    try {
      // Make API request to update diver day
      const updateU = await fetch(
        `${import.meta.env.VITE_H}/users/celebDiverDay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: this.token,
            diverday: diverday,
            diverPhotos: diverPhotos,
          }),
        }
      );

      // Get response from API
      const response = await updateU.json();

      // If the response is successful, show success toast and resolve promise
      if (response.res == "OK") {
        toast.dismiss(loadComp);
        toast.success("Diversario anadido!");
      }
    } catch (err) {
      // If the API request fails, show error toast and reject promise
      toast.dismiss(loadComp);
      toast.error("No se ha podido actualizar el diversario!");
    }
  }
  /**
   * Adds a diver day to the user's profile and shows appropriate toasts based on the response.
   * @param {DiverDay} diverday - The diver day to add.
   * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the addition was successful or not.
   */
  public async actDiverDay(diverday: DiverDay): Promise<boolean> {
    // Show loading toast
    const loadComp = toast.loading("Añadiendo diversario...");

    try {
      // Make API request to add diver day
      const updateU = await fetch(
        `${import.meta.env.VITE_H}/users/addDiverDay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: this.token,
            diverday: diverday,
          }),
        }
      );

      // Get response from API
      const response = await updateU.json();

      // Determine success or failure of addition based on response
      if (response.res == "OK") {
        // Add diver day to user's profile
        this.addDiverDay(diverday);

        // Show success toast and resolve promise
        toast.dismiss(loadComp);
        toast.success("Diversario añadido!");
        return true;
      } else if (response.res == "EXISTS") {
        // Show error toast and resolve promise
        toast.dismiss(loadComp);
        toast.error("Ya existe este diversario");
        return false;
      } else {
        // Show error toast and resolve promise
        toast.dismiss(loadComp);
        toast.error("Error al añadir el diversario");
        return false;
      }
    } catch (err) {
      // Show error toast and reject promise
      console.log(err);
      toast.dismiss(loadComp);
      toast.error("Error al anadir el diversario");
      return false;
    }
  }

  public async logOut(advice?: boolean): Promise<void> {
    let loadComp;
    if (advice) {
      loadComp = toast.loading("Cerrando sesión...");
    }
    // Show loading toast
    try {
      // Make API request to log out user
      await fetch(`${import.meta.env.VITE_H}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: this.token,
        }),
      });
      toast.dismiss(loadComp);
    } catch (err) {
      toast.dismiss(loadComp);
      toast.error("No se ha podido ejecutar el cierre de sesión");
    }
  }

  public async acceptFriend(friend: User, accepted: boolean): Promise<void> {
    // Show loading toast
    const loadComp = toast.loading("Actualizando...");
    try {
      // Make API request to update user
      const updateUser = await fetch(
        `${import.meta.env.VITE_H}/users/acceptFriend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: this.token,
            friend: friend,
            accepted: accepted,
          }),
        }
      );
      const response = await updateUser.json();
      if (response.res == "OK") {
        toast.dismiss(loadComp);
        toast.success("Solicitud aceptada");
        if (this.token) {
          User.getInfo(this.token);
        }
      } else if (response.res == "OK_NO") {
        toast.dismiss(loadComp);
        toast.success("Solicitud no aceptada");
        if (this.token) {
          User.getInfo(this.token);
        }
      } else {
        toast.dismiss(loadComp);
        toast.error("Error al aceptar la solicitud");
      }
    } catch (err) {
      toast.dismiss(loadComp);
      toast.error("No se ha podido ejecutar el cierre de sesión");
    }
  }

  /**
   * Asynchronously updates a user's information in the database.
   *
   * @return {Promise<void>} A promise that resolves when the update is complete.
   */
  public async updateU(): Promise<void> {
    // Show loading toast
    const loadComp = toast.loading("Actualizando...");

    try {
      // Make API request to update user
      const updateUser = await fetch(`${import.meta.env.VITE_H}/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          fname: this.fname,
          birthday: this.birthday,
          avatar: this.avatar,
          genre: this.genre,
          profile: this.profile,
          token: this.token,
        }),
      });

      // Get response from API
      const response = await updateUser.json();

      // Determine success or failure of update based on response
      if (response.res == "OK") {
        // Show success toast and resolve promise
        toast.dismiss(loadComp);
        toast.success("Usuario actualizado");
      } else {
        // Show error toast and resolve promise
        toast.dismiss(loadComp);
        toast.error("Error al actualizar usuario");
      }
    } catch {
      // Show error toast and reject promise
      toast.dismiss(loadComp);
      toast.error("Error al conectar a la base de datos");
    }
  }

  /**
   * Asynchronously compares the user's email and password with the ones stored in the database.
   * If the email and password are correct, it returns the user's session token.
   * If the email and password are incorrect, it returns "IEP".
   * If there is an error, it returns "ERR".
   *
   * @return {Promise<"IEP" | string | "ERR">} A promise that resolves to the session token, "IEP", or "ERR".
   */
  public async comprobUser(): Promise<"IEP" | string | "ERR"> {
    // Show loading toast
    const loadComp = toast.loading("Iniciando sesión...");

    try {
      // Make API request to compare user's email and password with the ones stored in the database
      const compU = await fetch(`${import.meta.env.VITE_H}/users/compUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          pass: this.password,
          token: this.token,
        }),
      });
      const response = await compU.json();
      console.log(response);

      // Determine success or failure of comparison based on response
      if (response.res == "IEP") {
        // Show error toast and return "IEP"
        toast.error("Email o contraseña incorrectos");
        return "IEP";
      } else if (response.res == "UID") {
        // Show error toast and return "ERR"
        toast.error("Sesión ya iniciada");
        return "ERR";
      } else if (response.res == "NEQ") {
        // Show error toast and return "ERR"
        toast.error("Has de esperar a poded iniciar sesión");
        return "ERR";
      } else if (response.res == "!PVER") {
        // Show error toast and return "ERR"
        toast.error("No se ha podido verificar el token de autenticación");
        return "ERR";
      } else {
        // Show success toast and return the session token
        toast.success("Sesión iniciada");
        return response.res;
      }
    } catch (error) {
      // Show error toast and return "ERR"
      toast.error("Error al iniciar sesión");
      return "ERR";
    } finally {
      // Dismiss loading toast
      toast.dismiss(loadComp);
    }
  }

  /**
   * Asynchronously retrieves user information from the database based on the provided user ID.
   *
   * @param {string} userId - The ID of the user whose information is to be retrieved.
   * @return {Promise<boolean | User>} A promise that resolves to either a `User` object representing the user's information or `false` if an error occurred.
   */
  public static async getInfo(userId: string): Promise<boolean | User> {
    // Show loading toast
    const loadComp = toast.loading("Cargando...");

    try {
      // Make API request to retrieve user information
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
        // Parse the response as JSON
        const response = await compU.json();

        // Dismiss loading toast
        toast.dismiss(loadComp);
        console.log(response);
        if (response.res == "!PVER") {
          toast.error("No se ha podido verificar el token de autenticación");
          return false;
        } else if (response.res == "TOKERR") {
          document.cookie =
            "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        // Set the prototype of the response object to `User.prototype` and return the resulting object
        return Object.setPrototypeOf(response, User.prototype) as User;
      } catch (error) {
        console.log(error);
        // Log the error and show error toast
        console.log(error);
        toast.dismiss(loadComp);
        toast.error("Error de token");
        document.cookie =
          "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Return `false` to indicate an error occurred
        return false;
      }
    } catch (error) {
      // Log the error and show error toast
      toast.dismiss(loadComp);
      toast.error("Error al obtener información del usuario");
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Return `false` to indicate an error occurred
      return false;
    }
  }

  public static async searchUser(
    session: string | undefined,
    search: string
  ): Promise<boolean | User> {
    // Show loading toast
    const loadComp = toast.loading("Buscando...");
    try {
      // Make API request to retrieve user information
      const compU = await fetch(`${import.meta.env.VITE_H}/users/searchUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: session,
          search: search,
        }),
      });
      try {
        const response = await compU.json();
        if (response.res == "!PVER") {
          toast.error("No se ha podido verificar el token de autenticación");
          return false;
        } else if (response.res == "TOKERR") {
          document.cookie =
            "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          toast.dismiss(loadComp);
          toast.success("Sesión caducada");
          return false;
        } else if (response.res == "NOUSERS") {
          toast.dismiss(loadComp);
          toast.error("No se han encontrado usuarios");
          return false;
        } else {
          // devolver aquí los usuarios
          toast.dismiss(loadComp);
          toast.success(`${response.res.length} usuarios encontrados`);
          return response.res;
        }
      } catch (error) {
        toast.dismiss(loadComp);
        toast.error("Error al obtener usuarios");
        return false;
      }
    } catch (error) {
      // Log the error and show error toast
      toast.dismiss(loadComp);
      toast.error("Error al obtener información del usuario");
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return false;
    }
  }
}
