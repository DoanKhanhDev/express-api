import { EntityManager } from "typeorm";
import Connection from "../Connection/Connection";

interface EntityTypeManager {}

class EntityTypeManager implements EntityTypeManager {

  protected entityTypeManger: EntityManager;

  constructor() {
    this.entityTypeManger = Connection.getConnection().manager;
  }



}
