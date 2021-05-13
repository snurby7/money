import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AgentsModule } from './agents/agents.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorService } from './auth/http-auth-interceptor.service';
import { CoreModule } from './core';
import { AccountEffects } from './ngrx-store/effects/account.effects';
import { BudgetEffects } from './ngrx-store/effects/budget.effects';
import { CategoryEffects } from './ngrx-store/effects/category.effects';
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
    EffectsModule.forRoot([BudgetEffects, AccountEffects, CategoryEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AgentsModule,
    AuthModule.forRoot({
      domain: environment.auth0_domain,
      clientId: environment.auth0_client_id,
      redirectUri: `${window.location.origin}/app`,
    }),
    CoreModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
