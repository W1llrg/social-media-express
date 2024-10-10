export const midError = (err, req, res, next) =>
{
	if (err) {
		return res.status(500).send({err.status ? err.status : 500}).json({error: err.message});
	} else {
		next();
	}
}