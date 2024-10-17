import { Component } from '@angular/core';
import './app.component.css';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ancho: number = 0; 
  alto: number = 0;
  largo: number = 0;
  mensajeError: string = '';
  mensajeExito: string = '';

  calcularVolumen() {

    if (this.ancho <= 0 || this.alto <= 0 || this.largo <= 0) {
      this.mensajeError = "Las medidas deben ser mayores a cero.";
      this.mensajeExito = "";

      Swal.fire({
        title: "Error",
        text: this.mensajeError,
        icon: "error"
      });
      return; 
    }

    const volumen = this.ancho * this.alto * this.largo; 
    const maxVolumen = 200000;

    if (volumen >= maxVolumen) {
      this.mensajeError = "El volumen del bulto excede el límite de 2 m³. Por favor, contacte a un ejecutivo.";
      this.mensajeExito = "";

      Swal.fire({
        title: "Error",
        text: this.mensajeError,
        icon: "error"
      });

    } else {
      const costo = (volumen / 20) * 2000;
      const fecha = new Date();
      const numeroOrden = Math.floor(Math.random() * 1000000);

      this.mensajeExito = `Pedido ingresado correctamente.
        Número de orden: ${numeroOrden}
        Costo: ${costo.toFixed(2)} CLP
        Volumen: ${volumen} cm³
        Fecha: ${fecha.toLocaleDateString('es-ES')}
        Hora: ${fecha.toLocaleTimeString('es-ES')}`;

      this.mensajeError = "";
      
      Swal.fire({
        title: "Buen trabajo!",
        text: this.mensajeExito,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: 'Volver a realizar otra cotización',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetForm();
        } else if (result.isDismissed) {
          this.resetForm();
          console.log('Proceso cancelado');
        }
      });
    }
  }

  resetForm() {
    this.ancho = 0;
    this.alto = 0;
    this.largo = 0;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  title = 'dropoff.client';
}
