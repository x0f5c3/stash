import React, { useMemo } from "react";
import { StashId } from "src/core/generated-graphql";
import { ConfigurationContext } from "src/hooks/Config";
import { getStashboxBase } from "src/utils/stashbox";

export type LinkType = "performers" | "scenes" | "studios";

export const StashIDPill: React.FC<{
  stashID: StashId;
  linkType: LinkType;
}> = ({ stashID, linkType }) => {
  const { configuration } = React.useContext(ConfigurationContext);

  const { endpoint, stash_id } = stashID;

  const endpointName = useMemo(() => {
    return (
      configuration?.general.stashBoxes.find((sb) => sb.endpoint === endpoint)
        ?.name ?? endpoint
    );
  }, [configuration?.general.stashBoxes, endpoint]);

  const base = getStashboxBase(endpoint);
  const link = `${base}${linkType}/${stash_id}`;

  return (
    <span className="stash-id-pill" data-endpoint={endpointName}>
      <span>{endpointName}</span>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {stash_id}
      </a>
    </span>
  );
};
