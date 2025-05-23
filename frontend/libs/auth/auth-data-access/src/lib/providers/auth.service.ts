import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {APP_CONFIG, AppConfig} from "@frontend/core";
import {Credentials, User} from "../+state/auth.state";
import {lastValueFrom} from "rxjs";

export interface LoginResponse {
  user: User;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    @Inject(APP_CONFIG) private readonly config: AppConfig,
    private readonly http: HttpClient
  ) {}

  public async login(
    credentials: Credentials
  ): Promise<{user: User; token: string}> {
    const response = await lastValueFrom(
      this.http.post<{user: User; token: string}>(
        `${this.config.apiUrl}/login`,
        {
          username: credentials.username,
          password: credentials.password,
        }
      )
    );

    return {user: response.user, token: response.token};
  }

  public async signUp(user: User): Promise<{user: User; token: string}> {
    const response = await lastValueFrom(
      this.http.post<{user: User; token: string}>(
        `${this.config.apiUrl}/register`,
        {
          username: user.username,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      )
    );
    return {user: response.user, token: response.token};
  }

  public async verifyAndRefreshToken(
    token: string
  ): Promise<{user: User; token: string}> {
    const response = await lastValueFrom(
      this.http.post<{user: User; token: string}>(
        `${this.config.apiUrl}/auth`,
        {
          token,
        }
      )
    );
    return {user: response.user, token: response.token};
  }
}
