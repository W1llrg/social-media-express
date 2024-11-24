import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql/type/index.js";
import {articleGetAllByUser, articleGetAllByUserFriend} from "../../services/articleService.js";
import {commentGetAllByUser, commentGetAllByUserFriend} from "../../services/commentService.js";

export const ArticleType = new GraphQLObjectType({
	name: "Article",
	fields: () => ({
		article_id: {type: GraphQLInt},
		title: {type: GraphQLString},
		content: {type: GraphQLString},
		posted_by: {type: GraphQLInt},
		part_of: {type: GraphQLInt}
	})
});

export const CommentType = new GraphQLObjectType({
	name: "Comment",
	fields: () => ({
		comment_id: {type: GraphQLInt},
		content: {type: GraphQLString},
		posted_by: {type: GraphQLInt},
		on_article: {type: GraphQLInt}
	})
});

export const rootQuery = new GraphQLObjectType({
	name: "RootQuery",
	fields: () => ({
		getUserArticles: {
			type: new GraphQLList(ArticleType),
			resolve: (root, args) => {
				return articleGetAllByUser(args.userId);
			}
		},
		getUserFriendArticles: {
			type: new GraphQLList(ArticleType),
			resolve: (root, args) => {
				return articleGetAllByUserFriend(args.userId);
			}
		},
		getUserComments: {
			type: new GraphQLList(ArticleType),
			resolve: (root, args) => {
				return commentGetAllByUser(args.userId);
			}
		},
		getUserFriendComments: {
			type: new GraphQLList(ArticleType),
			resolve: (root, args) => {
				return commentGetAllByUserFriend(args.userId);
			}
		}
	})
});