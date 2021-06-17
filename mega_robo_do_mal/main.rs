extern crate discord;
extern crate rand;
extern crate chrono;

use discord::model::Message;
use discord::model::GameType::Playing;
use discord::model::Game;
use discord::model::Event;
use discord::Discord;
use discord::model::ReactionEmoji;
use discord::model::UserId;
use chrono::Local;
use rand::{thread_rng, Rng};


fn main() 
{
  // a variável discord é importante, ela faz login com o token do bot e gera uma struct Discord
	let discord = Discord::from_bot_token("token")
  .expect("Token nao reconhecido.");
  
  // conecta a aplicacao com o discord usando websockets
  // a variavel conexao recebe a struct Connection e a _bot recebe a struct ReadyEvent
	let (mut conexao, _bot) = discord.connect().
  expect("Falha ao conectar com os websockets.");

  // aqui eu instanciei uma struct Game pra mostrar algo no status do bot, tipo "Jogando blabla"
  let status_padrao = Game
  {
    name: ">help 🤖 || converse com o dev: pampolha#0007".to_string(),
    url: None,
    kind: Playing,
  };
  let _status = conexao.set_game(Some(status_padrao));

  // lembrar que o horário marcado está em UTF, reduzir a hora em 3 para equalizar com o horário de belém.  
	println!("[{}] Bot iniciado.", Local::now());
  
	loop 
  {
		match conexao.recv_event()
    {
			Ok(Event::MessageCreate(message)) =>
      { 
        // instanciei um struct do tipo "Message" identica à struct message instanciada acima pq talvez isso me salve requests de API 
        let mut mensagem = Message
        {
          ..message
        };
        let msg = mensagem.content.to_lowercase();

        // repassa todas as mensagens que começam com o símbolo do bot e as próprias mensagens do bot
        if msg.starts_with(">") || mensagem.author.id == UserId(bot_id)
        {
          println!("[{}] {} disse: {} em {}",mensagem.timestamp, mensagem.author.name, mensagem.content, mensagem.channel_id);
        }

        // easter egg que faz com que o robo reaja com um emote de ">:)" caso essa carinha esteja na mensagem
        if msg.contains(">:)")
        {
          let _bot = discord.add_reaction
          (
            mensagem.channel_id,
            mensagem.id,
            ReactionEmoji::Unicode("😈".to_string())
          );
          println!("[{}] {} disse: {}",mensagem.timestamp, mensagem.author.name, mensagem.content);
        }
        
        // help deve mostrar as funcionalidades do bot
        if msg == ">help" 
        {
          let _bot = discord.send_message
          (
            mensagem.channel_id,
            "***FUNÇÕES***:
            >**CARA OU COROA:** JOGUE UMA MOEDA VIRTUAL DIGITANDO `>cc`!
            >**ROLAR DADO**: ROLE UM DADO COM QUALQUER QUANTIDADE DE LADOS DIGITANDO `>roll -qnt. de lados-`!
            MODIFICADORES ÚNICOS TAMBÉM SÃO POSSÍVEIS DIGITANDO `>roll -qnt. de lados- -+,-,*,/- -modificador-`!
            >**FALAR**: EU IREI COPIAR A SUA MENSAGEM (E APAGAR ELA, SE EU TIVER PERMISSÃO PARA ISSO) QUANDO DIGITAR `>out -mensagem-`!",
            "",
            false
          );
        }
        // "joga" uma moeda virtual e repassa o resultado como cara ou coroa
        else if msg == ">cc"
        {
          let cc:bool = rand::random();
          let ccr;

          match cc
          {
            true => 
            {
              ccr = "CARA";
            },
            false => 
            {
              ccr = "COROA";
            }
          };

          let _bot = discord.send_message
          (
            mensagem.channel_id,
            &format!("{} JOGOU UMA MOEDA E O RESULTADO FOI: **{}!**", mensagem.author.id.mention(), ccr),
            "",
            false
          );
        }
        // caso o usuario digite apenas >roll sem o numero de lados
        else if msg == ">roll"
        {
          let _bot = discord.send_message
          (
            mensagem.channel_id,
            "PARA ROLAR UM DADO, INSIRA O NÚMERO DE LADOS APÓS O COMANDO.",
            "",
            false
          );
        }
        // rolador de dados com lados indefinidos!
        else if msg.starts_with(">roll ") && msg.ends_with(char::is_numeric) 
        {
          // eu só tive que fazer essa bagunça pq o replit usa uma versão obsoleta do rustc, então não pude usar nenhum método decente de manipulação de strings...
          // a variável lados deve representar o número de lados que o usuário quer pro dado, sem o operador nem modificador
          //então o que eu fiz aqui foi criar uma variável lados_corte, que vai pegar a mensagem, cortar os números dela e checar se ela tem um operador. casso tenha, a variável lados será a mensagem sem os números finais nem o modificador
          // e caso ela não tenha um operador, a variável lados vai armazenar somente a mensagem sem o comando de rolar dado.
          let lados_corte = msg.trim_start_matches(">roll ").trim_start().trim_start_matches(char::is_numeric).trim_start().trim_end_matches(char::is_numeric).trim_end();
          let lados =
          if lados_corte == "+" || lados_corte == "-" || lados_corte == "*" || lados_corte == "/"
          {
            msg.trim_start_matches(">roll ").trim_start().trim_end_matches(char::is_numeric).trim_end().trim_end_matches("+").trim_end().trim_end_matches("-").trim_end().trim_end_matches("*").trim_end().trim_end_matches("/").trim_end()
          }
          else
          {
            msg.trim_start_matches(">roll ").trim_start()
          };

          // abaixo eu transformo o número de lados em um dado "concreto", e vou usar ele daqui em diante
          // também checo se o número de lados é 0 ou inválido(caso o usuário não tenha inserido os números corretamente o unwrap vai retornar default que é 0), informo o usuário e cancelo a operação pulando essa iteração do loop com continue 
          let dado: i128 = lados.parse().unwrap_or_default(); 

          if dado <= 0
          {
            let _bot = discord.send_message
            (
              mensagem.channel_id,
              "NÚMERO DE LADOS E/OU OPERAÇÃO INVÁLIDA. APENAS UM MODIFICADOR `+,-,*,/` APÓS O NÚMERO DE LADOS É ACEITO.",
              "",
              false
            );
            continue;
          }

          // outra bagunça devido ao mesmo motivo da variável lados, o procedimento é quase o mesmo
          // corto todos os números para achar o operador e corto apenas os números iniciais mais o operador encontrado para achar o modificador
          // além disso também gero um número aleatório que varia de 1 ao número do dado, que vai ser o resultado
          let operador = msg.trim_start_matches(">roll ").trim_start().trim_start_matches(char::is_numeric).trim_start().trim_end_matches(char::is_numeric).trim_end();
          let modificador: i128 = msg.trim_start_matches(">roll ").trim_start().trim_start_matches(char::is_numeric).trim_start().trim_start_matches(operador).trim_start().parse().unwrap_or_default();
          let roll: i128 = thread_rng().gen_range(1..=dado);

          // a etapa final dos dados é um match do operador, em que eu defino uma fórmula de resultado e envio uma mensagem adequada em cada caso
          match operador
          {
            "" =>
            {
              let _bot = discord.send_message
              (
                mensagem.channel_id,
                &format!("{} ROLOU UM ***D{}***, E O RESULTADO FOI: **{}**!", mensagem.author.id.mention(), dado, roll),
                "",
                false
              );
            },
            "+" =>
            {
              let result = roll+modificador;
              let _bot = discord.send_message
              (
                mensagem.channel_id,
                &format!("{0} ROLOU UM ***D{1}+{2}***, E O RESULTADO FOI: *({3}+{2})* = **{4}**!", mensagem.author.id.mention(), dado, modificador, roll, result),
                "",
                false
              );
            },
            "-" =>
            {
              let result = roll-modificador;
              let _bot = discord.send_message
              (
                mensagem.channel_id,
                &format!("{0} ROLOU UM ***D{1}-{2}***, E O RESULTADO FOI: *({3}-{2})* = **{4}**!", mensagem.author.id.mention(), dado, modificador, roll, result),
                "",
                false
              );
            },
            "*" =>
            {
              let result = roll*modificador;
              let _bot = discord.send_message
              (
                mensagem.channel_id,
                &format!("{0} ROLOU UM ***D{1}*{2}***, E O RESULTADO FOI: *({3}*{2})* = **{4}**!", mensagem.author.id.mention(), dado, modificador, roll, result),
                "",
                false
              );
            },
            "/" =>
            {
              let result = roll/modificador;
              let _bot = discord.send_message
              (
                mensagem.channel_id,
                &format!("{0} ROLOU UM ***D{1}/{2}***, E O RESULTADO FOI: *({3}/{2})* = **{4}**!* (ARREDONDADO PARA BAIXO)*", mensagem.author.id.mention(), dado, modificador, roll, result),
                "",
                false
              );
            },
            _ => 
            {
              let _bot = discord.send_message
              (
                mensagem.channel_id,
                "NÚMERO DE LADOS E/OU OPERAÇÃO INVÁLIDA. APENAS UM MODIFICADOR `+,-,*,/` APÓS O NÚMERO DE LADOS É ACEITO.",
                "",
                false
              );
            },  
          }       
        }
        
        // comando para fazer o bot falar por voce
        else if msg.starts_with(">out ")
        {
          // se o bot tiver permissao para deletar mensagens, ele vai deletar a mensagem de quem mandou o comando
          let _bot = discord.delete_message
          ( 
            mensagem.channel_id,
            mensagem.id
          );
          // eu fiz um pouco diferente aqui pra dar o usuário a escolha de escrever uma mensagem em letra maiúscula ou minúscula, mesmo o comando sendo insensitivo ao casing da letra
          let (_corte, fala) = mensagem.content.split_at_mut(4);
          let _bot = discord.send_message
          (
            mensagem.channel_id,
            &format!("{}", fala),
            "",
            false
          );
        }
      }

      Ok(_bot) => {}

			Err(discord::Error::Closed(code, body)) =>  
      {
        println!("Gateway encerrada com codigo: {:?}: {}", code, body);
        break;
      } 

			Err(err) =>  
      {
        println!("Erro de conexao: {:?}", err);
        break;
      }
		}
	}
}

