import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoDTO } from 'src/app/model/dto/evento-dto';
import { Ministrante } from 'src/app/model/ministrante';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MinistranteFormComponent } from '../../ministrante/ministrante-form/ministrante-form.component';
import { EventoService } from './../../../services/evento.service';
import { MinistranteService } from './../../../services/ministrante.service';
import { MinistranteComponent } from './ministrante/ministrante.component';
@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.scss']
})
export class EventoFormComponent implements OnInit {

  idEdicao: number;
  eventoForm: FormGroup;

  ministrantes: Ministrante[];
  eventos: EventoDTO[];

  tentouSalvar = false;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private ministranteService: MinistranteService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.idEdicao = Number(params.get('id'));
        this.eventoService.findFormDto(Number(params.get('id'))).subscribe(evento => {
          this.eventoForm.patchValue(evento);
        }, error => {
          this.snackbar.open(error.error.message);
          this.router.navigate(['/eventos']);
        });
      }
    });

    this.buscarMinistrantes();
    this.buscarEventos();
  }

  salvar(): void {
    this.tentouSalvar = true;
    if (this.eventoForm.valid) {
      this.converterProps();
      if (this.idEdicao) {
        this.eventoService.update(this.eventoForm.value).subscribe(evento => {
          this.snackbar.open('Evento atualizado!');
          this.router.navigate(['/eventos']);
        }, error => {
          this.snackbar.open(error.error.message);
        });
      } else {
        this.eventoService.create(this.eventoForm.value).subscribe(evento => {
          this.snackbar.open('Evento criado!');
          this.router.navigate(['/eventos']);
        }, error => {
          this.snackbar.open(error.error.message);
        });
      }
    } else {
      this.snackbar.open('Preencha os campos necessários!');
    }
  }

  inicializarForm(): void {
    this.eventoForm = this.fb.group({
      id: undefined,
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      local: ['', Validators.required],
      preco: undefined,
      qtdVagas: [undefined, Validators.required],
      idEventoPai: undefined,
      idOrganizador: undefined,
      inicio: [new Date(), Validators.required],
      fim: [new Date(), Validators.required],
      inicioInscricoes: [new Date(), Validators.required],
      fimInscricoes: [new Date(), Validators.required],
      idsMinistrantes: [[], Validators.required],
      imagem: undefined
    });
  }

  converterProps(): void {
    const controlPreco = this.eventoForm.get('preco');
    if (typeof controlPreco.value === 'string') {
      if (controlPreco.value) {
        controlPreco.setValue(Number(controlPreco.value.replace(',', '.')));
      } else {
        controlPreco.setValue(0);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MinistranteComponent, {
      disableClose: true,
      panelClass: '',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(idMinsitrante => {
      if (idMinsitrante) {
        const control = this.eventoForm.get('idsMinistrantes');
        control.setValue([idMinsitrante].concat(control.value));
        this.buscarMinistrantes();
      }
    });
  }

  setImage(image: string): void {
    this.eventoForm.get('imagem').setValue(image);
  }

  hasImage(): boolean {
    return typeof this.eventoForm.get('imagem').value === 'string';
  }

  buscarMinistrantes(): void {
    this.ministranteService.findAll().subscribe(ministrantes => {
      this.ministrantes = ministrantes;
    });
  }

  buscarEventos(): void {
    this.eventoService.findAllDto(this.idEdicao).subscribe(eventos => {
      this.eventos = eventos;
    });
  }
}
