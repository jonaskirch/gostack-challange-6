import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  RepositoryButton,
  RepositoryButtonText,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadStars();
  }

  componentDidUpdate(_, prevState) {
    const { page } = this.state;
    if (prevState.page !== page) {
      this.loadStars();
    }
  }

  handlePage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  handleNavigateRepository = repository => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  refreshList = async () => {
    const { page } = this.state;
    if (page !== 1) {
      this.setState({ refreshing: true, page: 1 });
    }
  };

  loadStars = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const { stars, page } = this.state;
    this.setState({ loading: true });
    const resp = await api.get(`/users/${user.login}/starred?page=${page}`);
    this.setState({
      stars: page > 1 ? [...stars, ...resp.data] : resp.data,
      loading: false,
      refreshing: false,
    });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator color="#7159C1" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.handlePage}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar
                  source={{
                    uri: item.owner.avatar_url,
                  }}
                />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
                <RepositoryButton
                  onPress={() => this.handleNavigateRepository(item)}
                >
                  <RepositoryButtonText>Acessar</RepositoryButtonText>
                </RepositoryButton>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
