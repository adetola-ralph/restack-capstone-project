import Authorization from '../middleware/authorization';
import { CategoryItemController, AuthController } from '../controllers';

const routes = (router) => {
  router.route('/categoryItems')
    .get(function* (req, res) {
      const categoryItems = yield CategoryItemController.getAll();
      res.json(categoryItems);
    })
    .post(Authorization.checkAuthentication, function* (req, res) {
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
    .patch(Authorization.checkAuthentication, function* (req, res) {
      const { id } = req.params;

      const updateCategoryItem = yield CategoryItemController.update(id, req.body);
      res.json(updateCategoryItem);
    })
    .delete(Authorization.checkAuthentication, function* (req, res) {
      const { id } = req.params;
      yield CategoryItemController.delete(id);
      res.json({
        message: 'Item deleted',
      });
    });

  router
    .post('/auth/login', function* (req, res) {
      const { body } = req;
      const result = yield AuthController.login(body);
      res.json(result);
    })
    .post('/auth/register', function* (req, res) {
      const { body } = req;
      const result = yield AuthController.register(body);
      res.json(result);
    });
};

export default routes;
