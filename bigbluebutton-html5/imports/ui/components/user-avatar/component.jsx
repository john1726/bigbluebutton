import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '/imports/ui/components/icon/component';
import styles from './styles.scss';
import cx from 'classnames';
import generateColor from './color-generator';

const propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isPresenter: PropTypes.bool.isRequired,
    isVoiceUser: PropTypes.bool.isRequired,
    isModerator: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
};

export default class UserAvatar extends Component {
  render() {
    const {
      user,
    } = this.props;

    const avatarColor = user.isOnline ? generateColor(user.name) : '#fff';

    const avatarStyles = {
      backgroundColor: avatarColor,
      boxShadow: user.isTalking ? `0 0 .5rem ${avatarColor}` : 'none',
    };

    return (
      <div
        className={user.isOnline ? styles.userAvatar : styles.userLogout}
        style={avatarStyles} aria-hidden="true"
      >
        <div>
          {this.renderAvatarContent()}
        </div>
        {this.renderUserStatus()}
        {this.renderUserMediaStatus()}
      </div>
    );
  }

  renderAvatarContent() {
    const user = this.props.user;

    let content = <span aria-hidden="true">{user.name.slice(0, 2)}</span>;

    if (user.emoji.status !== 'none') {
      let iconEmoji;

      switch (user.emoji.status) {
        case 'thumbsUp':
          iconEmoji = 'thumbs_up';
          break;
        case 'thumbsDown':
          iconEmoji = 'thumbs_down';
          break;
        case 'raiseHand':
          iconEmoji = 'hand';
          break;
        case 'away':
          iconEmoji = 'time';
          break;
        case 'neutral':
          iconEmoji = 'undecided';
          break;
        default:
          iconEmoji = user.emoji.status;
      }
      content = <span aria-label={user.emoji.status}><Icon iconName={iconEmoji} /></span>;
    }

    return content;
  }

  renderUserStatus() {
    const user = this.props.user;
    let userStatus;

    const userStatusClasses = {};
    userStatusClasses[styles.moderator] = user.isModerator;
    userStatusClasses[styles.presenter] = user.isPresenter;

    if (user.isModerator || user.isPresenter) {
      userStatus = (
        <span className={cx(styles.userStatus, userStatusClasses)} />
      );
    }

    return userStatus;
  }

  renderUserMediaStatus() {
    const user = this.props.user;
    let userMediaStatus;

    const userMediaClasses = {};
    userMediaClasses[styles.voiceOnly] = user.isListenOnly;
    userMediaClasses[styles.microphone] = user.isVoiceUser;

    if (user.isListenOnly || user.isVoiceUser) {
      userMediaStatus = (
        <span className={cx(styles.userMediaStatus, userMediaClasses)}>
          {user.isMuted ? <div className={styles.microphoneMuted} /> : null}
        </span>
      );
    }

    return userMediaStatus;
  }
}

UserAvatar.propTypes = propTypes;
UserAvatar.defaultProps = defaultProps;
