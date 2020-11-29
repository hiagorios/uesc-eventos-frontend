import { MinistranteService } from './../../../services/ministrante.service';
import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MinistranteComponent } from './ministrante/ministrante.component';
import { Ministrante } from 'src/app/model/ministrante';
import { EventoDTO } from 'src/app/model/dto/evento-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.scss']
})
export class EventoFormComponent implements OnInit {

  isEdicao = false;
  eventoForm: FormGroup;

  ministrantes: Ministrante[];
  eventos: EventoDTO[];

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

    this.buscarMinistrantes();
    this.buscarEventos();

    this.inicializarForm();
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.isEdicao = true;
        this.eventoService.findById(Number(params.get('id'))).subscribe(evento => {
          this.eventoForm.patchValue(evento);
        });
      }
    });
  }

  salvar(): void {
    if (this.eventoForm.valid) {
      this.converterProps();
      if (this.isEdicao) {
        // TODO: Edição
      } else {
        this.eventoService.create(this.eventoForm.value).subscribe(evento => {
          this.snackbar.open('Evento criado!');
          this.router.navigate(['..']);
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
      idsMinistrantes: [[], Validators.required]
    });
  }

  converterProps(): void {
    const controlPreco = this.eventoForm.get('preco');
    if (controlPreco.value) {
      controlPreco.setValue(Number(controlPreco.value.replace(',', '.')));
    } else {
      controlPreco.setValue(0);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MinistranteComponent, {
      disableClose: true,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(idMinsitrante => {
      if (idMinsitrante) {
        this.eventoForm.get('idsMinistrantes').setValue([idMinsitrante]);
        this.buscarMinistrantes();
      }
    });
  }

  buscarMinistrantes(): void {
    this.ministranteService.findAll().subscribe(ministrantes => {
      this.ministrantes = ministrantes;
    });
  }

  buscarEventos(): void {
    this.eventoService.findAll().subscribe(eventos => {
      this.eventos = eventos;
    });
  }

}
