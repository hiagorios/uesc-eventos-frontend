import { Injectable } from '@angular/core';
import { OwlDateTimeIntl } from 'ng-pick-datetime';

@Injectable()
export class DatePickerIntl extends OwlDateTimeIntl {

  upSecondLabel = 'Aumentar um segundo';
  downSecondLabel = 'Diminuir um segundo';
  upMinuteLabel = 'Aumentar um minuto';
  downMinuteLabel = 'Diminuir um minuto';
  upHourLabel = 'Aumentar uma hora';
  downHourLabel = 'Diminuir a hora';
  prevMonthLabel = 'Mês anterior';
  nextMonthLabel = 'Mês seguinte';
  prevYearLabel = 'Ano anterior';
  nextYearLabel = 'Ano seguinte';
  prevMultiYearLabel = 'Previous 21 years';
  nextMultiYearLabel = 'Next 21 years';
  switchToMonthViewLabel = 'Ver meses';
  switchToMultiYearViewLabel = 'Escolher mês e ano';
  cancelBtnLabel = 'Cancelar';
  setBtnLabel = 'Definir';
  rangeFromLabel = 'De';
  rangeToLabel = 'Até';
  hour12AMLabel = 'AM';
  hour12PMLabel = 'PM';
}
