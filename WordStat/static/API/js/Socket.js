//--------------------------------------------------------------------------------------------------

var Socket = $.extend(
    
/*--------------------------------------------------------------------------------------------------
|
| -> Свойства
|
|-------------------------------------------------------------------------------------------------*/

    {public: {onChange: null}},// Пользовательский обработчик состояний соединения
    {public: {console: null}},// Выводит сообщение в консоль
    
/*--------------------------------------------------------------------------------------------------
|
| -> Конструктор
|
|-------------------------------------------------------------------------------------------------*/

    {private: {constructor: function() {
        this.events = {};// Создаем список событий
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Добавляет консоль
|
|-------------------------------------------------------------------------------------------------*/

    {private: {setConsole: function(isConsole) {
    // Указатель
        var t = this;
        
    /* Консоль (вкл./выкл.)
     * -> all = все запросы
     * -> body = только тело запросов
     * -> false = выкл.
    **/
        t.isConsole = isConsole;
        
    // Console
        t.console = function(message) {
            if (t.isConsole) {
                t.div.innerHTML += '<div style="color:#FFFFFF">' + message + '</div>';
                t.div.scrollTop = t.div.scrollHeight;
            }
        };
        
    // In
        t.console['->'] = function(event, message) {
            if (t.isConsole) {
                t.div.innerHTML += '<div style="color:#C4A000"><b style="color:#FCE94F">-&gt; ' + event + ':</b> ' + message + '</div>';
                t.div.scrollTop = t.div.scrollHeight;
            }
        };
        
    // Out
        t.console['<-'] = function(event, message) {
            if (t.isConsole) {
                t.div.innerHTML += '<div style="color:#06989A"><b style="color:#34E2E2">&lt;- ' + event + ':</b> ' + message + '</div>';
                t.div.scrollTop = t.div.scrollHeight;
            }
        };
        
    // Добавляем консоль
        if (t.isConsole) {
        // Создаем консоль
            t.div = document.createElement('div');
            
        // Добавляем консолю стиль
            t.div.style.position = 'absolute';
            t.div.style.left = 0;
            t.div.style.right = 0;
            t.div.style.bottom = 0;
            t.div.style.padding = '5px';
            t.div.style.height = '290px';
            t.div.style.fontSize = '12px';
            t.div.style.fontFamily = "'Ubuntu Mono', Menlo, Consolas, monospace";
            t.div.style.whiteSpace = 'pre-wrap';
            t.div.style.background = '#003A58';
            t.div.style.overflowY = 'auto';
            
        // Создаем контент
            var content = document.createElement('div');
            
        // Добавляем контенту стиль
            content.style.position = 'absolute';
            content.style.top = 0;
            content.style.left = 0;
            content.style.right = 0;
            content.style.bottom = '300px';
            content.style.overflowY = 'auto';
            
        // Добавляем body в контент
            content.innerHTML = document.body.innerHTML;
            
        // Отчищаем body
            document.body.innerHTML = '';
            
        // Добавляем контент на сцену
            document.body.appendChild(content);
            
        // Добавляем консоль на сцену
            document.body.appendChild(t.div);
        }
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Добавляет новый обработчик
|
|-------------------------------------------------------------------------------------------------*/

    {public: {on: function(event, callback) {
    // Создаем новое событие
        if (!this.events[event]) {
            this.events[event] = [];
        }
        
    // Добавляем новый обработчик
        this.events[event][this.events[event].length] = callback;
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Инициализирует событие
|
|-------------------------------------------------------------------------------------------------*/

    {public: {emit: function(event, success) {
    // Проверяем наличие события
        if (this.events[event]) {
        // Проходим по списку обработчиков события
            for (var i = 0; i < this.events[event].length; i++) {
            // Запускаем обработчик
                this.events[event][i].call(this, success);
            }
        }
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Добавляет реквизиты для авторизации
|
|-------------------------------------------------------------------------------------------------*/

    {public: {setAccess: function(args) {
    // Добавляем обработчик успешной авторизации
        this.on('Access', function(success) {
        // Запускаем обработчик полной загрузки
            this.onload('Access', success);
            
        // Переходим к инициализации
            this.change('Init');
        });
        
    // Добавляем callback для отправки запроса на авторизацию
        this.onAccess = function() {
        // Отправляем запрос на авторизацию
            this.send('Access', {args:args});
        };
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Добавляет реквизиты для инициализации
|
|-------------------------------------------------------------------------------------------------*/

    {public: {setInit: function(msg) {
    // Добавляем обработчик завершения инициализации
        this.on('Init', function(success) {
        // Запускаем обработчик полной загрузки
            this.onload('Init', success);
            
        // Переходим к завершению инициализации
            this.change('Complete');
        });
        
    // Добавляем callback для отправки запроса на инициализацию
        this.onInit = function() {
        // Отправляем запрос на инициализацию
            this.send('Init', msg);
        };
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Добавляет обработчик ошибок
|
|-------------------------------------------------------------------------------------------------*/

    {public: {setError: function() {
    // Добавляем обработчик ошибок
        this.on('Error', function(success) {
        // Выводим сообщение об ошибке
            this.change('Error', success['error_msg']);
        });
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Системный обработчик состояний соединения
|
|-------------------------------------------------------------------------------------------------*/

    {private: {change: function(status, error_msg) {
    // Запускаем пользовательский обработчик состояний соединения
        if (this.onChange) {
            this.onChange(status, error_msg);
        }
        
    // Обрабатываем ошибку
        if (status == 'Error') {
        // Записываем в лог
            this.console['->']('Error', error_msg);
        }
        
    // Переходим к авторизации
        if (status == 'Access') {
        // Записываем в лог
            this.console['->']('Server', 'Соединение установлено!');
            
        // Отправляем запрос на авторизацию
            if (this.onAccess) {
                this.onAccess();
            }
            
        // Переходим к инициализации
            else {
                this.change('Init');
            }
        }
        
    // Переходим к инициализации
        if (status == 'Init') {
        // Отправляем запрос на инициализацию
            if (this.onInit) {
                this.onInit();
            }
            
        // Переходим к завершению инициализации
            else {
                this.change('Complete');
            }
        }
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Инициализирует соединение с сервером
|
|-------------------------------------------------------------------------------------------------*/

    {public: {connect: function(p) {
    // Указатель
        var t = this;
        
    // Добавляем консоль
        t.setConsole(p.console);
        
    // Добавляем реквизиты для авторизации
        t.setAccess(p.access);
        
    // Добавляем реквизиты для инициализации
        t.setInit(p.init);
        
    // Добавляем обработчик ошибок
        t.setError();
        
    // Добавляем обработчик полной загрузки
        t.onload = function(status, success) {
        // Не задан обработчик полной загрузки
            if (!p.onload) return;
            
        // Переход к инициализации еще не наступил
            if (t.onInit && status != 'Init') return;
            
        // Переход к авторизации еще не наступил
            if (t.onAccess && status == 'Connect') return;
            
        // Запускаем обработчик полной загрузки
            p.onload.call(t, success);
        };
        
    // Проверка поддержки браузером
        if (!window.WebSocket) {
            t.change('Error', 'Ваш браузер не поддерживает технологию WebSocket.');
            return;
        }
        
    // Соединяемся с сервером
        t.change('Connect');
        
    // Создаем экземпляр WebSocket
        t.socket = new WebSocket(p.host);
        
    // Добавляем обработчик разрыва соединения
        t.socket.onclose = function() {
        // Выводим сообщение об ошибке
            t.change('Error', 'Соединение прервано!');
        };
        
    // Добавляем обработчик успешного соединения
        t.socket.onopen = function() {
        // Запускаем обработчик полной загрузки
            t.onload('Connect');
            
        // Переходим к авторизации
            t.change('Access');
        };
        
    // Добавляем обработчик сообщений
        t.socket.onmessage = function(r) {
        // Извлекаем данные
            var json = r.data;
            
        // Конвертируем из JSON
            r = JSON.parse(json);
            
        // Записываем в консоль
            t.console['->'](r[0], (t.isConsole == 'body' ? JSON.stringify(r[1]) : json));
            
        // Запускаем обработчик события
            t.emit(r[0], r[1]);
        };
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Отправляет сообщение
|
|-------------------------------------------------------------------------------------------------*/

    {public: {send: function(header, body) {
    // Создаем запрос
        var r = [];
        
    // Заголовок
        r.push(header);
        
    // Тело запроса (по умолчанию пустой объект)
        r.push(typeof(body) == 'object' ? body : {});
        
    // Конвертируем в JSON
        var json = JSON.stringify(r);
        
    // Отправляем сообщение
        this.socket.send(json);
        
    // Записываем в консоль
        this.console['<-'](header, (this.isConsole == 'body' ? JSON.stringify(r[1]) : json));
    }}}
);

//--------------------------------------------------------------------------------------------------