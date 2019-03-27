export function consoleHelloMessage () {
  const customMessage = '                                                       \n' +
      '  ______ ____  _  _   _   _     ____  _____    _       \n' +
      ' |  ____|___ \\| || | | | | |   |___ \\|  __ \\  (_)      \n' +
      ' | |__    __) | || |_| |_| |__   __) | |__) |  _  ___  \n' +
      ' |  __|  |__ <|__   _| __| \'_ \\ |__ <|  _  /  | |/ _ \\ \n' +
      ' | |     ___) |  | | | |_| | | |___) | | \\ \\ _| | (_) |\n' +
      ' |_|    |____/   |_|  \\__|_| |_|____/|_|  \\_(_)_|\\___/ \n' +
      '                                                       \n' +
      '                                                       \n'

  // let feather = '                                                       \n' +
  //     '             ----- ------------ ---                              \n' +
  //     '        ,,/\\/    /  \\/  //  /  /   \\                          \n' +
  //     '=\\\\\\\\\\\\\\============================-                     \n' +
  //     '        ``\\ \\  \\\\   \\    \\   /\\  \\ /                     \n' +
  //     '           ----- ------------  ---                               \n'
  console.log('%c%s', 'background: #222; color: #00FFFF', customMessage)
  console.log('%c Hi there, nice to meet you!', 'background: #222; color: #bada55')
  console.log('%c Att: F34th3R and Jafet', 'background: #222; color: #00FFFF')
  console.log('%c %s', 'color: #555', 'https://www.f34th3r.io')
}
