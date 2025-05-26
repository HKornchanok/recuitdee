import {TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {AuthFacade} from "@frontend/auth-data-access";
import {ThemeFacade} from "@frontend/theme";
import {authReducer} from "@frontend/auth-data-access";
import {themeFeature} from "@frontend/theme";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([]),
        StoreModule.forRoot({
          auth: authReducer,
          theme: themeFeature.reducer,
        }),
      ],
      providers: [AuthFacade, ThemeFacade],
    }).compileComponents();
  });

  it("should render router outlet", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("router-outlet")).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("frontend");
  });
});
