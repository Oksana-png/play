import React from 'react';
import style from './ClassComponent.module.css';
// !чтоб не ругался eslint
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    // state - иммутабельный, его нельзя менять
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: 0,
      returned: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Не передавать объект
    this.setState(state => ({
      count: state.count + 1,
    }));
    this.setState(state => {
      if (!state.userNumber) return state;

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
          userNumber: '',
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
          userNumber: '',
        };
      }
      return {
        result: `Вы угадали загаданное число ${state.userNumber},
        с ${state.count} попытки`,
        userNumber: '',
        returned: true,
      };
    });
  };
  handleChange = e => {
    this.setState({
      // ! Обновляем state.userNumber
      userNumber: e.target.value,
    });
  };
  returnPlay = () => {
    this.setState(state => ({
      count: 0,
      returned: false,
      result: 'Введите число',
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form
          className={style.form}
          onSubmit={this.handleSubmit}
        >

          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber} />
          <button className={style.btn}>Угадать</button>
          {
            !this.state.returned ? '' :
              <button onClick={this.returnPlay} className={style.btn}>
                Играть ещё
              </button>
          }

        </form>
      </div>
    );
  }
}

// ! задаем пропсам "фиксированные" типы, чтобы eslint не ругался
ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
