import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { MultiplayergameComponent } from './components/multiplayergame/multiplayergame.component'

const routes: Routes = [
  { path: 'iframepage', component: BoardComponent },
  { path: 'mainpage', component: MultiplayergameComponent },
  { path: '**',   redirectTo: '/game', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TestComponent,
    MultiplayergameComponent
  ],
  imports: [BrowserModule, NgxChessBoardModule.forRoot(), RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
