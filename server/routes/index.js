import { CategoryItemController } from '../controllers';

const routes = (router) => {
  router.route('/categoryItems')
    .get(function* (req, res) {
      const categoryItems = yield CategoryItemController.getAll();
      res.json(categoryItems);
    })
    .post(function* (req, res) {
      const categoryItems = req.body;
      const newCategoryItem = yield CategoryItemController.create(categoryItems);
      res.status(201).json(newCategoryItem);
    });
};

export default routes;
