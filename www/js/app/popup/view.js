define(['marionette', 'text!popup/tpl/view.html'], function (Marionette, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        events: {
            "submit": "add"
        },

        ui: {
            error: ".error",
            name: "input[name=name]",
            password: "input[name=password]"
        },

        add: function(e) {
            e.preventDefault();

            var self = this;

            this.model.set({
                name: this.ui.name.val(),
                password: this.ui.password.val()
            });

            this.model.save(this.model.attributes, {
                success: function() {
                    localStorage.setItem('session', JSON.stringify({ name: self.model.get('name'),
                        password: self.model.get('password') })); //если присваивать незаметный токен, можно избежать всех уязвимостей
                    Backbone.history.navigate('/main', {trigger: true});
                },

                error: function(xhr) {
                    self.$(".error").html("Oops! Вероятно вы ввели кое-что неправильно или что-то пошло не так!");
                    self.ui.error.show(); //нужны нормальные ошибки с сервера, а не что-то абстрактное
                }
            });
        },

        onRender: function() {
            this.ui.error.hide();
        }

    });

});