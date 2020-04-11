import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CategoryPage from '../category/category.component'
import {connect} from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CategoryPagewWithSpinner = WithSpinner(CategoryPage);

class ShopPage extends React.Component  {
   state = {
      loading: true
   };
   unsubscribeFromSnapshot = null;

   componentDidMount() {
      const { updateCollections } = this.props;
      const collectionRef = firestore.collection('collections');

      this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
         updateCollections(collectionsMap)
         this.setState({ loading: false});
      })

   }
   render() {
      const { match } = this.props;
      const { loading } = this.state;
      return (
         <div className='shop-page'>
            <Route exact path={`${match.path}`} render={props => (
               <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>
               )} 
            />
            <Route path={`${match.path}/:categoryId`} render={props => (
               <CategoryPagewWithSpinner isLoading={loading} {...props}/> 
               )}
            />
         </div>)
   }
}

const mapDispatchToProps = dispatch => ({
   updateCollections: collectionsMap => 
      dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
