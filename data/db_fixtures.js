import Users from "../models/users.js";
import Articles from "../models/articles.js";
import Comments from "../models/comments.js";
import Contents from "../models/contents.js";
import Friends from "../models/friends.js";
import SubscribedTo from "../models/subscribedTo.js";

async function loadFixtures()
{
	// users pool
	await Users.create(
		{
			first_name: "Jimmy",
			last_name: "McGill",
			surname: "Saul Goodman",
			email: "jmm@hmm.com",
			password: "justicemattersmost"
		}
	);

	await Users.create(
		{
			first_name: "Kim",
			last_name: "Wexler",
			surname: "SlippinKimmy",
			email: "kwexler@hmm.com",
			password: "ihatehoward"
		}
	);

	await Users.create(
		{
			first_name: "Charles",
			last_name: "McGill",
			surname: "Chuck",
			email: "charles.attorney@hmm.com",
			password: "iamnotcrazy"
		}
	);

	await Users.create(
		{
			first_name: "Howard",
			last_name: "Hamlin",
			surname: "H.Namaste",
			email: "hhamlin@hmm.com",
			password: "namaste"
		}
	);

	await Users.create(
		{
			first_name: "Jesse",
			last_name: "Pinkman",
			surname: "CapNCook",
			email: "jpinkcapn@hotmail.com",
			password: "yomrwhite"
		}
	);

	// contents
	await Contents.create(
		{
			title: "Law",
			created_by: 1
		}
	)

	// articles
	await Articles.create(
		{
			title: "Better Call Saul!",
			content: "Hi, I'm Saul Goodman. Did you know that you have rights? The constitution says you do! And so do I.\n" +
				"Conscience gets expensive, doesn't it?\n" +
				"For a substantial fee, and I do mean substantial, you and your loved ones can vanish. Untraceable.\n" +
				"I want it in a money order and make it out to Ice Station Zebra Associates. That's my loan out. It's totally legit … it's done just for tax purposes. After that we can discuss Visa or Mastercard, but definitely not American Express, so don't even ask, all right?\n" +
				"You're a high-risk client. You're gonna need the deluxe service. It's gonna cost you.\n" +
				"If you're committed enough, you can make any story work. I once told a woman I was Kevin Costner, and it worked because I believed it.\n" +
				"I never should have let my dojo membership run out.\n" +
				"Better safe than sorry. That's my motto.\n" +
				"As to your dead guy, occupational hazard. Drug dealer getting shot? I'm gonna go out on a limb here and say it's been known to happen.\"\n" +
				"Don't drink and drive, but if you do, call me.",
			part_of: 1,
			posted_by: 1
		}
	)
}

export default loadFixtures;