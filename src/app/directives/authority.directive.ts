import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

type Criteria = 'hasPermission' | 'hasAnyPermission' | 'isAuthenticated' | 'hasAllPermissions';

@Directive({
  selector: '[hasPermission], [hasAnyPermission], [isAuthenticated], [hasAllPermissions]'
})
export class AuthorityDirective implements OnInit, OnDestroy {

  private permissao: boolean;
  private isHidden = true;
  private verifyCriteria: Criteria;
  private destroyed$ = new Subject();
  private val: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionGuardService: AuthGuardService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.check();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  check(): void {
    switch (this.verifyCriteria) {
      case 'hasPermission':
        this.permissao = this.permissionGuardService.handlerHasPermission(this.val);
        this.updateView();
        break;
      case 'hasAnyPermission':
        this.permissao = this.permissionGuardService.handlerHasAnyPermission(this.val);
        this.updateView();
        break;
      case 'isAuthenticated':
        this.permissao = this.permissionGuardService.handlerIsAuthenticated(this.val);
        this.updateView();
        break;
      case 'hasAllPermissions':
        this.permissao = this.permissionGuardService.handlerHasAllPermissions(this.val);
        this.updateView();
        break;
    }
  }

  @Input()
  set hasPermission(val: string) {
    this.val = val;
    this.verifyCriteria = 'hasPermission';
    this.permissao = this.permissionGuardService.handlerHasPermission(val);
    this.updateView();
  }

  @Input()
  set hasAnyPermission(val: string[]) {
    this.val = val;
    this.verifyCriteria = 'hasAnyPermission';
    this.permissao = this.permissionGuardService.handlerHasAnyPermission(val);
    this.updateView();
  }

  @Input()
  set isAuthenticated(val: boolean) {
    this.val = val;
    this.verifyCriteria = 'isAuthenticated';
    this.permissao = this.permissionGuardService.handlerIsAuthenticated(val);
    this.updateView();
  }

  @Input()
  set hasAllPermissions(val: string[]) {
    this.val = val;
    this.verifyCriteria = 'hasAllPermissions';
    this.permissao = this.permissionGuardService.handlerHasAllPermissions(val);
    this.updateView();
  }

  private updateView(): void {
    if (this.permissao) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

}
