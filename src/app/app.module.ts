import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { FileUploadModule } from 'ng2-file-upload';
import { UsuarioComponent } from './component/dashboard/usuario/usuario.component';
import { AuthComponent } from './component/auth/auth.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CDBFreeModule } from 'ng-cdbangular';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MainComponent } from './component/dashboard/main/main.component';
import { GestionRutasComponent } from './component/dashboard/gestion-rutas/gestion-rutas.component';
import { PerfilComponent } from './component/dashboard/perfil/perfil.component';
import { ProductoComponent } from './component/dashboard/producto/producto.component';
import { GestionRolComponent } from './component/dashboard/gestion-rol/gestion-rol.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    UsuarioComponent,
    AuthComponent,
    SidebarComponent,
    DashboardComponent,
    MainComponent,
    GestionRutasComponent,
    PerfilComponent,
    ProductoComponent,
    GestionRolComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    CDBFreeModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
