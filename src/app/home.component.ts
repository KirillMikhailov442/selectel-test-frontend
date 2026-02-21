import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="home-page">
      <section class="home-hero">
        <div class="home-hero__badge">Mini App • Angular 19+</div>
        <h1>Привет!</h1>
        <p class="home-hero__subtitle">Это мини‑приложение из двух страниц с меню и чекбоксами.</p>
        <div class="home-hero__cta">
          <a class="home-hero__button" routerLink="/menu">Перейти к меню</a>
          <span class="home-hero__hint">Данные статичны, расчеты обновляются</span>
        </div>
      </section>
      <section class="home-panels">
        <div class="home-panel">
          <div class="home-panel__title">Сигналы</div>
          <div class="home-panel__text">Сумма и количество обновляются мгновенно.</div>
        </div>
        <div class="home-panel">
          <div class="home-panel__title">Новый синтаксис</div>
          <div class="home-panel__text">&#64;if / &#64;for для шаблонов.</div>
        </div>
        <div class="home-panel">
          <div class="home-panel__title">Standalone</div>
          <div class="home-panel__text">Только standalone компоненты.</div>
        </div>
      </section>
    </main>
  `
})
export class HomeComponent {}
