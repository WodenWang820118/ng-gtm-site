// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const coreModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  imports: [...coreModules],
  exports: [...coreModules],
})
export class SharedModule {}
