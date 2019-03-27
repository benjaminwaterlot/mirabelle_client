import gql from 'graphql-tag';

export default gql`
	{
		getCurrentProducts {
			id
			name
			picture
			origin
			category
			price_ht
			bio
			getWikiProduct {
				description_short
			}
		}
	}
`;
