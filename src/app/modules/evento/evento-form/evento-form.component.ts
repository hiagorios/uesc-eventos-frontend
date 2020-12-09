import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoDTO } from 'src/app/model/dto/evento-dto';
import { Ministrante } from 'src/app/model/ministrante';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EventoService } from './../../../services/evento.service';
import { MinistranteService } from './../../../services/ministrante.service';
import { MinistranteComponent } from './ministrante/ministrante.component';
import {FormControl} from '@angular/forms';
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

  minist = new FormControl(null);

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private ministranteService: MinistranteService,
    private snackbar: SnackbarService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.idEdicao = Number(params.get('id'));
        this.eventoService.findFormDto(Number(params.get('id'))).subscribe(evento => {
          console.log(evento);
          this.eventoForm.patchValue(evento);
          console.log(this.eventoForm);
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
          this.router.navigate(['..']);
        });
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
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(idMinsitrante => {
      if (idMinsitrante) {
        this.eventoForm.get('idsMinistrantes').setValue([idMinsitrante]);
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
