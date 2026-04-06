-- À exécuter dans Supabase : SQL Editor → New query → Run
-- Crée la table alignée sur l’API (id, nom, age, ville)

create table if not exists public.users (
  id bigint generated always as identity primary key,
  nom text not null,
  age integer not null check (age >= 0 and age <= 150),
  ville text not null
);

comment on table public.users is 'Utilisateurs de l’API REST (remplace l’ancien tableau en mémoire).';

-- Données de départ (même jeu que le projet initial)
-- À exécuter une seule fois sur une table vide (sinon tu auras des doublons).
insert into public.users (nom, age, ville)
values
  ('Alban', 25, 'Annecy'),
  ('Bob', 30, 'Bordeaux'),
  ('Clémence', 35, 'Caen');
