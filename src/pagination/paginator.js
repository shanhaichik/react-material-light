import React from 'react';
import ClassNames from 'classnames';
import PureRender from 'react-pure-render-decorator';
import style from './paginator.css';

@PureRender
class Paginator extends React.Component {
    static propTypes = {
        previousLabel: React.PropTypes.string,
        nextLabel: React.PropTypes.string,
        // Кол-во страниц
        pageNum: React.PropTypes.number,
        // Диапозон
        pageRange: React.PropTypes.number,
        forceSelected: React.PropTypes.number,
        initialSelected:React.PropTypes.number,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        previousLabel: 'Назад',
        nextLabel: 'Далее',
        pageNum:1,
        pageRange:10,
        marginPages:1
    };

    state = {
        selected: this.props.initialSelected ? this.props.initialSelected : 0
    };

    handlePreviousPage = e => {
        if(e) e.preventDefault();
        if (this.state.selected > 0) {
            this.handlePageSelected(this.state.selected - 1, e);
        }
    };

    handlePageSelected = (selected, e) => {
        if(e) e.preventDefault();
        if (this.state.selected === selected) return;

        this.setState({selected: selected});

        if(this.props.onChange) this.props.onChange(selected);
    };

    handleNextPage = e => {
        if(e) e.preventDefault();
        if (this.state.selected < this.props.pageNum - 1) {
            this.handlePageSelected(this.state.selected + 1, e);
        }
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.forceSelected && nextProps.forceSelected !== this.state.selected)
            this.setState({ selected: nextProps.forceSelected });
    }

    componentDidMount() {
        if (typeof(this.props.initialSelected) !== 'undefined') {
            this.onChange(this.props.initialSelected);
        }
    }

    renderPrevButton() {
        const classItem = ClassNames(
            style.paginate__item,
            style.previous, {
                [style.disabled]: (this.state.selected === 0)
            }
        );
        return (
            <li className={classItem}>
                <a href="" className={style.previous__link} onClick={this.handlePreviousPage}>{this.props.previousLabel}</a>
            </li>
        )
    }

    renderNextButton() {
        const classItem = ClassNames(
            style.paginate__item,
            style.next, {
                [style.disabled]: (this.state.selected === this.props.pageNum - 1)
            }
        );
        return (
            <li className={classItem}>
                <a href="" className={style.next__link} onClick={this.handleNextPage}>{this.props.nextLabel}</a>
            </li>
        )
    }

    renderPaginationList() {
        const _tempMap = new Array(this.props.pageNum).fill(0);
        // Если кол-во страницы меньше или равно диапозону показа, по просто выводим список
        //if (this.props.pageNum <= this.props.pageRange) {
            return _tempMap.map(function(el, i) {
                const classItem = ClassNames(
                    style.paginate__item, {
                        [style['paginate__item--active']]: (this.state.selected === i)
                    }
                );

               return (
                    <li className={classItem} key={'page'+i}>
                        <a href="" className={style.paginate__link} onClick={this.handlePageSelected.bind(null, i)}>{++i}</a>
                    </li>
               )
            }, this);
       // }
       /* else {
          //TODO


        }*/
    }

    render() {
        return(
            <div className={style.paginate}>
                <ul className={style.paginate__list}>
                    {this.renderPrevButton()}
                    {this.renderPaginationList()}
                    {this.renderNextButton()}
                </ul>
            </div>
        )
    }
}


export default Paginator;