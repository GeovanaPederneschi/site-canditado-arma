# Sobre este site

Este é um **template de portfólio**: um candidato e campanha fictícios
("Marcos Teixeira", deputado estadual, número 1911, pauta de segurança
pública/legítima defesa/CACs) criados para mostrar um site de campanha
organizado por causa — não representa nenhuma pessoa real.

# Setup: cadastro de apoiadores + painel admin

- Formulário público (`#cadastro`) grava nome, e-mail, WhatsApp e bairro num banco de dados real.
- Painel administrativo em `/admin` (login em `/admin/login`) lista apoiadores e dispara e-mails de novidade.
- Exportação em CSV para envio manual de WhatsApp.

Roda em **Supabase** (banco + login) e **Resend** (e-mail). Use um projeto e uma conta próprios para este site.

## 1. Supabase

1. Crie um projeto em https://supabase.com.
2. No **SQL Editor**, rode [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql).
3. Copie `Project URL` e `anon public` key em **Project Settings → API**.

## 2. Frontend

1. Copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
2. Configure as mesmas variáveis na hospedagem, se for publicar.

## 3. Admin

1. Em **Authentication → Users → Add user**, crie um usuário.
2. Copie o `User UID` e rode no SQL Editor:
   ```sql
   insert into public.admins (user_id, email)
   values ('COLE-O-USER-UID-AQUI', 'email-do-admin@exemplo.com');
   ```

## 4. Resend

1. Crie conta em https://resend.com, verifique um domínio (ou use `onboarding@resend.dev`).
2. Gere uma API Key.

## 5. Edge Function

```bash
npm install -g supabase
supabase login
supabase link --project-ref SEU-PROJECT-REF
supabase secrets set RESEND_API_KEY=sua-api-key-do-resend
supabase secrets set BROADCAST_FROM_EMAIL="Marcos Teixeira <onboarding@resend.dev>"
supabase functions deploy send-broadcast
```

## 6. Testar

`npm run dev`, cadastre um apoiador de teste, entre em `/admin/login` e envie uma novidade de teste.
