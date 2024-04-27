import { DataSource, Repository, ObjectLiteral} from "typeorm";
import Connection from "../Connection/Connection";

/**
 * The Entity type manager interface.
 */
export interface EntityTypeManagerInteface {

  /**
   * Get entity type manager from entity manager.
   * @param {string} name
   *
   * @returns The entity manager type based from entity manager.
   */
  getStorage(name: string): Repository<ObjectLiteral> | null;
}

/**
 * The entity type manager base from Datasource
 */
export default new (class EntityTypeManager implements EntityTypeManagerInteface {
  /**
   * The entity type manager.
   */
  protected connection: DataSource;

  constructor() {
    this.connection = Connection.getConnection();
  }

  public getStorage(name: string): Repository<ObjectLiteral> | null {
    if (name.length === 0) {
      return null;
    }
    return this.connection.getRepository(name);
  }

})();
