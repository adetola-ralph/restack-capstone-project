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

  router.route('/categoryItems/:id')
    .get(function* (req, res) {
      const { id } = req.params;

      const categoryItem = yield CategoryItemController.find(id);
      res.json(categoryItem);
    })
    .patch(function* (req, res) {
      const { id } = req.params;


      const updateCategoryItem = yield CategoryItemController.update(id, req.body);

      res.json(updateCategoryItem);
    })
};

export default routes;
