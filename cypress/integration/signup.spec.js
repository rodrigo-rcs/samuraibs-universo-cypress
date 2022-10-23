import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    context('quando o usuário e novato', function () {

        const user = {
            name: 'Rodrigo Canton',
            email: 'rodrigo.rcs@gmail.com',
            password: '123456'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar com sucesso', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            //


            // configurando intercepte ao inves de acesso a banco
            //    cy.intercept('POST', '/users', {
            //        statusCode: 200
            //    }).as('postUser')



            //    cy.wait('@postUser')



        })

    })

    context('quando o email já existe', function () {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('não deve cadastrar o usuário', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })

    })

    context('quando o email e incorreto', function () {
        const user = {
            name: 'Elisabeth Olsen',
            email: 'lisa.yahoo.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })

    })

    context('quando a senha tem menos de 5 caracteres', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, function () {
                const user = { name: 'Jason Friday', email: 'json@gmail.com', password: p }

                signupPage.form(user)
                signupPage.submit()

            })
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos', function() {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){

            it('deve exibir ' + alert.toLowerCase(), function(){
                signupPage.alertHaveText(alert)
            })
        })
    })

})


