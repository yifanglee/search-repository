import React, { createContext } from 'react';
import axios from 'axios';

export const SearchContext = createContext({
  cooldown: false,
  errorMsg: '',
  items: [],
  keyword: '',
  loading: false,
  notFound: false,
  page: 1,
  totoal: 0,
  searchReop: () => {}
});

export class SearchProvider extends React.Component {
  searchReop = (q, test = 1) => {
    const _this = this;
    const { totoal, items, page, keyword } = _this.state;
    _this.setState({ errorMsg: '' });

    if (q === '') {
      _this.setState({ items: [], totoal: 0, keyword: '' });
      return;
    } else if (_this.state.cooldown) {
      _this.setState({ loading: true });
      return;
    } else if (
      items.length >= totoal &&
      keyword === q &&
      totoal > 0 &&
      items.length > 0
    ) {
      return;
    }
    let offsetpage = q === _this.state.keyword ? page + 1 : 1;
    _this.setState({ loading: true });

    axios
      .get(
        `https://api.github.com/search/repositories?q=${q}&per_page=50&page=${offsetpage}`
      )
      .then(function (response) {
        let notFoundFlag = response.data.total_count === 0 ? true : false;

        _this.setState({
          items:
            q === _this.state.keyword
              ? items.concat(response.data.items)
              : response.data.items,
          totoal: response.data.total_count,
          keyword: q,
          page: offsetpage,
          loading: false,
          notFound: notFoundFlag
        });
      })
      .catch(function (error) {
        let { message = '' } = error.response.data;
        let cooldown = false;
        if (error.response.status === 403) {
          cooldown = true;
          message = '';
          window.setTimeout(() => {
            _this.setState({ cooldown: false });
            _this.searchReop(q);
          }, 60000);
        }
        _this.setState({
          items: [],
          errorMsg: message,
          cooldown: cooldown,
          loading: false
        });
      });
  };
  state = {
    cooldown: false,
    errorMsg: '',
    items: [],
    keyword: '',
    loading: false,
    notFound: false,
    page: 1,
    totoal: 0,
    searchReop: this.searchReop
  };
  render() {
    return (
      <SearchContext.Provider value={this.state}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
export const SearchConsumer = SearchContext.Consumer;
