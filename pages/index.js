import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json'
import { getNome } from '../src/service/getNome'

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();
  const [nome, setNome] = React.useState('')
  const [found, setFound] = React.useState(true)
  const [dirty, setDirty] = React.useState(false)

  function getUrl() {
    if (!found) {
        return 'https://www.elegantthemes.com/blog/wp-content/uploads/2020/08/000-http-error-codes.png'
    }
    if (username.length > 2) {
        return `https://github.com/${username}.png`
    }
    return 'https://i.pinimg.com/736x/83/32/00/833200e26037f39252a7ad894410c453.jpg'
}

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700]
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguem submeteu o form')
              roteamento.push(`/chat?username=${username}`);
             // window.location.href = '/chat';
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              placeholder='Digite seu usuário GitHub'
              onChange={function (event) {
                console.log('usuario digitou', event.target.value);
                const valor = event.target.value;
                if (valor.length > 2) {
                    getNome(valor).then((e) => {
                        if (e) {
                            setNome(e)
                            setFound(true)
                        } else {
                            setNome('')
                            setFound(false)
                        }
                    })
                } else {
                    setNome('')
                    setFound(true)
                }

                setUsername(valor);
                setDirty(true)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800]
                }
              }}
            />
            {username.length <= 2 && dirty &&
                            <Text
                                styleSheet={{
                                    marginBottom: '10px', color: appConfig.theme.colors.primary[100],
                                    fontFamily: 'Play',
                                }}
                            >
                                Digite mais que 2 caracteres.
                            </Text>}

                        {!found &&
                            <Text
                                styleSheet={{
                                    marginBottom: '10px', color: appConfig.theme.colors.primary[100],
                                    fontFamily: 'Play'
                                }}>
                                Usuário inválido
                            </Text>

                        }

            <Button
            disabled={username.length <= 2 || !found}
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px'
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px'
              }}
              src={getUrl()}
            />
            {found && <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px',
                                textAlign: 'center',
                                fontFamily: 'Play'
                            }}
                        >
              {nome || 'Star Butterfly'}
            </Text>
            }
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  )
}
