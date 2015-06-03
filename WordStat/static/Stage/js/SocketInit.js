/*--------------------------------------------------------------------------------------------------
|
| -> Инициализируем сокет
|
|-------------------------------------------------------------------------------------------------*/

Onloader.on(function() {
// Добавляем пользовательский обработчик состояний соединения
    Socket.onChange = function(status, error_msg) {
    // Скрываем весь контент
        gl.id('error').className = 'hidden';
        gl.id('loading').className = 'hidden';
        gl.id('content').className = 'hidden';
        
    // Обрабатываем ошибку
        if (status == 'Error') {
            gl.id('error').className = '';
            gl.id('error').innerHTML += '<div>' + error_msg + '</div>';
        }
        
    // Соединяемся с сервером
        if (status == 'Connect') {
            gl.id('loading').className = '';
            gl.id('loading').innerHTML = 'Соединение с сервером...';
        }
        
    // Переходим к авторизации
        if (status == 'Access') {
            gl.id('loading').className = '';
            gl.id('loading').innerHTML = 'Авторизация...';
        }
        
    // Переходим к инициализации
        if (status == 'Init') {
            gl.id('loading').className = '';
            gl.id('loading').innerHTML = 'Инициализация...';
        }
        
    // Переходим к завершению инициализации
        if (status == 'Complete') {
            gl.id('content').className = '';
        }
    };
    
// Инициализируем соединение с сервером
    Socket.connect({
    /* Консоль (вкл./выкл.)
     * -> all = все запросы
     * -> body = только тело запросов
     * -> false = выкл.
    **/
        console: 'body',
        
    // Адрес сервера
        host: 'wss://wordstat-server-classtype.c9.io',
        
    // Реквизиты для авторизации
        access: ['701111', 'my_password'],
        
    // Реквизиты для инициализации
        init: ['war_id'],
        
    // Обработчик загрузки после инициализации
        onload: function(id, name) {
            this.console('ID: ' + id);
            this.console('name: ' + name);
            this.console('Собственный текст в консоли!');
            this.console('Собственный текст в консоли!');
            this.console('Собственный текст в консоли!');
            this.send('getName', 1, 'Вася');
        }
    });
});

Socket.on('setName', function(arg1, arg2, arg3) {
    this.console('arg1: ' + arg1);
    this.console('arg2: ' + arg2);
    this.console('arg3: ' + arg3);
});

//--------------------------------------------------------------------------------------------------