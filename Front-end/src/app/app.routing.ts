import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ChoosenComponent } from './components/choosen/choosen.component';
import { GameComponent } from './components/game/game.component';
import { PartnerComponent } from './components/partner/partner.component';

const appRoutes: Routes = [
    {
        path: '', component: RegisterComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'choosing', component: ChoosenComponent
        
    },
    {
        path: 'partner', component: PartnerComponent
    },
    {
        path: 'game', component: GameComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
