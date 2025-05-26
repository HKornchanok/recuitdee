import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  Character,
  CharacterPagination,
  CharacterResults,
  Episode,
  Location,
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

  public async getCharacterById(id: number): Promise<Character> {
    const response = await lastValueFrom(
      this.http.get<Character>(
        `https://rickandmortyapi.com/api/character/${id}`
      )
    );

    const character = await this.getDetailsByCharacter(response);
    return character;
  }

  public async getDetailsByCharacter(character: Character): Promise<Character> {
    const episodes = await this.getEpisodesByUrls(
      character.episode as string[]
    );
    const location = await this.getLocationByLocationUrl(
      character.location?.url
    );
    const origin = await this.getLocationByLocationUrl(character.origin?.url);

    return {
      ...character,
      episodeDetails: episodes,
      locationDetails: location,
      originDetails: origin,
    };
  }

  public async getEpisodeByUrl(url: string): Promise<Episode> {
    const response = await lastValueFrom(this.http.get<Episode>(url));
    return response;
  }

  public async getEpisodesByUrls(urls: string[]): Promise<Episode[]> {
    if (!urls || urls.length === 0) {
      return [];
    }

    try {
      // Extract episode IDs from URLs
      const episodeIds = urls
        .map((url) => {
          const match = url.match(/\/episode\/(\d+)$/);
          return match ? match[1] : null;
        })
        .filter((id) => id !== null);

      if (episodeIds.length === 0) {
        return [];
      }

      // Make a single request with all episode IDs
      const response = await lastValueFrom(
        this.http.get<Episode[]>(
          `https://rickandmortyapi.com/api/episode/${episodeIds.join(",")}`
        )
      );
      // If only one episode is requested, the API returns a single object instead of an array
      return Array.isArray(response) ? response : [response];
    } catch (error) {
      console.error("Error fetching episodes:", error);
      return [];
    }
  }

  private async getLocationByLocationUrl(url: string): Promise<Location> {
    if (!url) {
      return {
        id: 0,
        name: "Unknown",
        type: "Unknown",
        dimension: "Unknown",
        residents: [],
        url: "",
      };
    }
    const response = await lastValueFrom(this.http.get<Location>(url));
    return {
      id: response.id,
      name: response.name,
      type: response.type,
      dimension: response.dimension,
      residents: response.residents,
      url: response.url,
    };
  }
}
