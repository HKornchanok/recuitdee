import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  Character,
  CharacterPagination,
  CharacterResults,
} from "../interfaces/character.interface";
import {lastValueFrom} from "rxjs";

interface CharacterResponse {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class CharacterService {
  constructor(private readonly http: HttpClient) {}

  public async getCharacters(
    pagination: CharacterPagination,
    refresh = false
  ): Promise<CharacterResults> {
    let next = pagination.next;
    try {
      if (refresh) {
        next = "";
      }
      if (next && next !== "") {
        const response = await lastValueFrom(
          this.http.get<CharacterResponse>(next)
        );
        return {
          results: response.results,
          pagination: {
            ...pagination,
            next: response.info.next,
            prev: response.info.prev,
          },
        };
      }

      const queryParams = new URLSearchParams();
      if (pagination.filter.searchQuery) {
        queryParams.set("name", pagination.filter.searchQuery);
      }
      if (pagination.filter.gender) {
        queryParams.set("gender", pagination.filter.gender);
      }
      if (pagination.filter.status) {
        queryParams.set("status", pagination.filter.status);
      }

      const response = await lastValueFrom(
        this.http.get<CharacterResponse>(
          `https://rickandmortyapi.com/api/character?${queryParams.toString()}`
        )
      );

      console.log(response);

      return {
        pagination: {
          count: response.info.count,
          pages: response.info.pages,
          next: response.info.next,
          prev: response.info.prev,
          filter: {
            searchQuery: pagination.filter.searchQuery,
            gender: pagination.filter.gender,
            status: pagination.filter.status,
          },
        },
        results: response.results,
      };
    } catch (error) {
      return {
        results: [],
        pagination: {
          ...pagination,
          next: "",
          prev: "",
          count: 0,
          pages: 0,
        },
      };
    }
  }
}
