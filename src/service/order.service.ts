import { HydratedDocument } from "mongoose";
import { CommonService } from "../types/resolvers.types";
import { OrderModel } from "../db/models/order.model";
import { OrderDocument } from "../interface";
import { messageConstants, httpErrorConstants, OrderEnum } from "../constants";
import { authHelper, errorHelper } from "../helpers";

const orderService: CommonService<
  any,
  OrderDocument | OrderDocument[] | boolean
> = {
  Query: {
    getOrders: async (_, {}, context) => {
      try {
        authHelper.checkAuth(context);
        const orders: HydratedDocument<OrderDocument>[] =
          await OrderModel.find().populate("product").populate("user");
        return orders;
      } catch (err) {
        console.log("err: ", err);
        errorHelper.throwCustomError(
          err.message || messageConstants.INTERNAL_SERVER_ERROR,
          err?.extensions?.http
            ? errorHelper.errorTypes[
                Object.keys(httpErrorConstants).find(
                  (key) => httpErrorConstants[key] === err.extensions.http
                )
              ]
            : errorHelper.errorTypes.INTERNAL_SERVER_ERROR
        );
      }
    },
    getOrder: async (_, args, context) => {
      try {
        authHelper.checkAuth(context);
        const order: HydratedDocument<OrderDocument> = await OrderModel.findOne(
          {
            _id: args.orderId,
          }
        )
          .populate("product")
          .populate("user");
        if (!order) {
          errorHelper.throwCustomError(
            messageConstants.ORDER_NOT_FOUND,
            errorHelper.errorTypes.NOT_FOUND
          );
        }
        return order;
      } catch (err) {
        console.log("err: ", err);
        errorHelper.throwCustomError(
          err.message || messageConstants.INTERNAL_SERVER_ERROR,
          err?.extensions?.http
            ? errorHelper.errorTypes[
                Object.keys(httpErrorConstants).find(
                  (key) => httpErrorConstants[key] === err.extensions.http
                )
              ]
            : errorHelper.errorTypes.INTERNAL_SERVER_ERROR
        );
      }
    },
  },
  Mutation: {
    completeOrder: async (_, args, context) => {
      try {
        authHelper.checkAuth(context);
        const completeOrder: HydratedDocument<OrderDocument> = new OrderModel({
          product: args.completeOrderInput.product,
          user: args.completeOrderInput.user,
          quantity: args.completeOrderInput.quantity,
          orderStatus: OrderEnum.Completed,
          orderAmount: args.completeOrderInput.orderAmount,
          discount: args.completeOrderInput.discount || null,
          paidAmount: args.completeOrderInput.paidAmount,
          deliveryAddress: args.completeOrderInput.deliveryAddress,
        });
        await completeOrder.save();
        return true;
      } catch (err) {
        console.log("err: ", err);
        errorHelper.throwCustomError(
          err.message || messageConstants.INTERNAL_SERVER_ERROR,
          err?.extensions?.http
            ? errorHelper.errorTypes[
                Object.keys(httpErrorConstants).find(
                  (key) => httpErrorConstants[key] === err.extensions.http
                )
              ]
            : errorHelper.errorTypes.INTERNAL_SERVER_ERROR
        );
      }
    },
  },
};

export { orderService };
