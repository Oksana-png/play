import React from 'react';
import style from './LifeCycle.module.css';

export class LifeCycle extends React.Component {
  /**
   * !render
   * construstor
   * getDeriverStateFromProps
   * render
   *
   * !commit
   * обновляется DOM
   * componentDidMount
   * componentWillUnmount
   */
  constructor(props) {
    super(props);
    console.log('constructor');
    // state создаем только в constructor
    this.state = {
      field: 0,
      hasError: false,
    };
  }

  /**
   * !render
   * getDeriverStateFromProps
   * shouldComponentUpdate
   * render
   * -
   * !pre-commit
   * getSnapshotBeforeUpdate
   * Обновляется DOM
   * !commit
   * componentDidUpdate
   */

  // принимает новые props и новое состояние
  // в pureComponent не используется метод ниже. Т.к. он автомат. сравнивает
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate');

    return this.state !== nextState || this.props !== nextProps;
  }
  // принимает предыдущие props и состояние (state)
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate'); // слепок сохранить
    return window.pageYOffset;
  }
  // то, что передал getSnapshotBeforeUpdate, будет в snapshot
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    window.scrollBy(0, -snapshot);
  }

  componentDidMount() {
    console.log('componentDidMount');
    // для подписок на события, таймеров
    // setInterval(() => {
    //   this.setState(state => ({
    //     field: state.field + 1,
    //   }));
    // }, 3000);
    // сайт эффекты (resize, scroll), запросы на сервер
    // document.addEventListener('scroll', this.handler);
    // eslint-disable-next-line react/prop-types
    document.title = this.props.prop;
  }

  // delete слушателей
  componentWillUnmount() {
    // document.removeEventListener('scroll', this.handler);
  }

  /**
   * !error
   * getDerivedStateFromError
   * componentDidCatch
   */

  static getDerivedStateFromError(err) {
    return {
      hasError: true,
    };
  }
  componentDidCatch() {
    // sendLog(errorInfo.componentStack);
  }

  // UNS-методы есть и работают, но устарели


  // вызывается перед рендером (при монтаровании) и при обновлении
  // можно обновлять скролл, когда пришло сообщение
  static getDerivedStateFromProps(props, state) {
    console.log('getDeriverStateFromProps');
    return state;
  }

  handler = () => {
    this.setState(state => ({field: state.field + 1}));
  };

  render() {
    console.log('render');
    if (this.state.hasError) {
      return <h1 className={style.title}>Типы</h1>;
    } else {
      return (
        <div>
          <h1 className={style.title}>Жизненный цикл</h1>

          <div className={style.container}>
            <div>
              <h2 className={style.title}>Типы</h2>
              <ul className={style.list}>
                <li>Монтирование</li>
                <li>Обновление</li>
                <li>Размонтирование</li>
                <li>Ошибки</li>
              </ul>
            </div>

            <div className='stage'>
              <h2 className={style.title}>Этапы</h2>
              <ul className={style.list}>
                <li>Render</li>
                <li>Pre-commit</li>
                <li>Commit</li>
              </ul>
            </div>
          </div>

          <button onClick={this.handler} className={style.btn}>
            Click {this.state.field}
          </button>
        </div>
      );
    }
  }
}
