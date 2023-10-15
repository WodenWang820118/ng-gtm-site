// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const coreModules = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  imports: [...coreModules],
  exports: [...coreModules],
})
export class SharedModule {}
