-- Apoiadores cadastrados pelo formulário público do site
create table if not exists public.supporters (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  whatsapp text not null,
  bairro text,
  created_at timestamptz not null default now()
);

-- Lista de administradores autorizados a acessar o painel e disparar novidades.
-- Cada linha vincula um usuário de auth.users (criado no Authentication do
-- Supabase) a este projeto. Ver instruções de setup para como popular esta tabela.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- Histórico de novidades enviadas para a lista de apoiadores
create table if not exists public.broadcasts (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  body text not null,
  sent_by uuid references auth.users (id),
  recipient_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.supporters enable row level security;
alter table public.admins enable row level security;
alter table public.broadcasts enable row level security;

-- O formulário público (usuário anônimo) pode se cadastrar como apoiador
drop policy if exists "Public can register as supporter" on public.supporters;
create policy "Public can register as supporter"
  on public.supporters
  for insert
  to anon, authenticated
  with check (true);

-- Só administradores autenticados podem ler a lista de apoiadores
drop policy if exists "Admins can view supporters" on public.supporters;
create policy "Admins can view supporters"
  on public.supporters
  for select
  to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- Um usuário autenticado pode checar se ele mesmo é administrador
drop policy if exists "Users can check their own admin status" on public.admins;
create policy "Users can check their own admin status"
  on public.admins
  for select
  to authenticated
  using (user_id = auth.uid());

-- Só administradores podem ver o histórico de novidades enviadas
drop policy if exists "Admins can view broadcasts" on public.broadcasts;
create policy "Admins can view broadcasts"
  on public.broadcasts
  for select
  to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- O disparo em si (leitura de todos os e-mails + gravação do histórico) é
-- feito pela Edge Function "send-broadcast" usando a service role key, que
-- ignora RLS — por isso não há policy de insert em broadcasts nem de select
-- ampla em supporters para o cliente autenticado além da própria listagem acima.
