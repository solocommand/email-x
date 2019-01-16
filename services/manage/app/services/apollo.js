import ApolloService from 'ember-apollo-client/services/apollo';
import { inject } from '@ember/service';
import authorize from '@base-cms/parcel-plug-manage/apollo/authorize';
import { computed } from '@ember/object';
import { setContext } from 'apollo-link-context';

export default ApolloService.extend({
  session: inject(),

  link: computed(function() {
    const httpLink = this._super(...arguments);
    const authLink = setContext((req, ctx) => {
      return authorize(this.get('session'), req, ctx);
    });
    return authLink.concat(httpLink);
  }),
});
