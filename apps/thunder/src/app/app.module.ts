import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AgentsModule } from './agents/agents.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { AccountEffects } from './ngrx-store/effects/account.effects';
import { BudgetEffects } from './ngrx-store/effects/budget.effects';
import { mammothReducers } from './ngrx-store/reducers/mammoth.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AgentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(mammothReducers, {
      runtimeChecks: {
        strictActionWithinNgZone: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([BudgetEffects, AccountEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AgentsModule,
    AuthModule.forRoot({
      domain: environment.auth0_domain,
      clientId: environment.auth0_client_id,
      redirectUri: `${window.location.origin}/app`,
      httpInterceptor: {
        allowedList: [
          {
            uriMatcher: (uri) => {
              console.log(uri);
              return true;
            },
            uri: `api/*`,
            // tokenOptions: {
            //   audience: environment.auth0_audience,
            // },
          },
        ],
      },
    }),
    CoreModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
